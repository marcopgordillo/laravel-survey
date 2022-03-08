<?php

namespace App\Http\Controllers;

use App\Enums\QuestionType;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return SurveyResource::collection(
            Survey::where('user_id', $user->id)->paginate(6)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }

        $survey = Survey::create($data);

        // Create new questions
        foreach($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $question = $this->validateQuestion($question);
            $survey->questions()->create($question);
        }

        return SurveyResource::make($survey->load(['questions']));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey)
    {
        $this->authorize('view', $survey);
        return SurveyResource::make($survey->load('questions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if ($survey->image) {
                Storage::delete($survey->image);
            }
        }

        $survey->update($data);

        // Get ids as plain array of existing questions
        $existingIds = $survey->questions()->pluck('id')->toArray();

        // Get ids as plain array of new questions
        $newIds = Arr::pluck($data['questions'], 'id');

        // Find questions to delete
        $toDelete = array_diff($existingIds, $newIds);

        // Find questions to add
        $toAdd = array_diff($newIds, $existingIds);

        // Delete questions by $toDelete Array
        Question::destroy($toDelete);

        // Create new questions
        foreach($data['questions'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $question = $this->validateQuestion($question);
                $survey->questions()->create($question);
            }
        }

        // Update existing questions
        $questionMap = collect($data['questions'])->keyBy('id');
        foreach($survey->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $data = $this->validateUpdateQuestion($questionMap[$question->id]);
                $question->update($data);
            }
        }

        return SurveyResource::make($survey->load(['questions']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey)
    {
        $this->authorize('delete', $survey);

        $survey->delete();

        if ($survey->image) {
            Storage::delete($survey->image);
        }

        return response('', Response::HTTP_NO_CONTENT);
    }

    protected function saveImage($base64Image)
    {
        throw_if(
            !preg_match('/^data:image\/(\w+);base64,(.+)/', $base64Image, $result),
            ValidationException::withMessages(['image' => 'Did not match data URI with image data'])
        );
        $type = strtolower($result[1]); // jpg, png, gif
        $fileData = $result[2];
        $fileData = str_replace(' ', '+', $fileData);
        $fileData = base64_decode($fileData);

        throw_if(
            !$fileData,
            ValidationException::withMessages(['image' => 'Base64 decode failed'])
        );

        // var_dump($fileData); die;
        $imageName = 'images/' . Str::random() . ".{$type}";
        Storage::put($imageName, $fileData);
        return $imageName;
    }

    protected function validateQuestion($data)
    {
        $validator = Validator::make($data, [
            'question'      => ['required', 'string'],
            'type'          => ['required', new Enum(QuestionType::class)],
            'description'   => ['nullable', 'string'],
            'data'          => ['present'],
        ]);

        return $validator->validated();
    }

    protected function validateUpdateQuestion($data)
    {
        $validator = Validator::make($data, [
            'id'        => ['exists:App\Models\Question,id'],
            'question'  => ['required', 'string'],
            'type'          => ['required', new Enum(QuestionType::class)],
            'description'   => ['nullable', 'string'],
            'data'          => ['present'],

        ]);

        return $validator->validated();
    }
}
