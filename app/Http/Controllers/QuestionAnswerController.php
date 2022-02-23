<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuestionAnswerRequest;
use App\Http\Requests\UpdateQuestionAnswerRequest;
use App\Models\QuestionAnswer;

class QuestionAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreQuestionAnswerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreQuestionAnswerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuestionAnswer  $questionAnswer
     * @return \Illuminate\Http\Response
     */
    public function show(QuestionAnswer $questionAnswer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateQuestionAnswerRequest  $request
     * @param  \App\Models\QuestionAnswer  $questionAnswer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateQuestionAnswerRequest $request, QuestionAnswer $questionAnswer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuestionAnswer  $questionAnswer
     * @return \Illuminate\Http\Response
     */
    public function destroy(QuestionAnswer $questionAnswer)
    {
        //
    }
}
