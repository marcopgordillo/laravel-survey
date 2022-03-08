<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnswerResource;
use App\Http\Resources\SurveyResource;
use App\Models\Answer;
use App\Models\Survey;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        // Total number of surveys
        $totalSurveys = Survey::query()
                ->where('user_id', $user->id)
                ->count();

        // Latest survey
        $latest = Survey::query()
                ->where('user_id', $user->id)
                ->latest('created_at')
                ->first();

        // Total number of answers
        $totalAnswers = Answer::query()
                ->join('surveys', 'answers.survey_id', '=', 'surveys.id')
                ->where('surveys.user_id', $user->id)
                ->count();

        // Latest 5 answers
        $latestAnswers = Answer::query()
                ->join('surveys', 'answers.survey_id', '=', 'surveys.id')
                ->where('surveys.user_id', $user->id)
                ->orderBy('end_date', 'DESC')
                ->limit(5)
                ->getModels('answers.*');

        return [
            'totalSurveys'  => $totalSurveys,
            'latestSurvey'  => $latest ? SurveyResource::make($latest->load(['questions'])) : null,
            'totalAnswers'  => $totalAnswers,
            'latestAnswers' => AnswerResource::collection($latestAnswers),
        ];
    }
}
