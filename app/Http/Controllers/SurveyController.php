<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
        $user = $request->user;
        return SurveyResource::collection(
            Survey::where('user_id', $user->id)->paginate()
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

        return SurveyResource::make($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey)
    {
        $this->authorize('show', $survey);
        return SurveyResource::make($survey);
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
        }

        $survey->update($data);

        return SurveyResource::make($survey);
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
}
