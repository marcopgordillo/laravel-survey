<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function() {
    Route::middleware(['auth:sanctum', 'verified'])->group(function() {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::resource('surveys', SurveyController::class);
        Route::get('/dashboard', DashboardController::class)->name('dashboard');
    });

    Route::get('/survey-by-slug/{survey:slug}', [SurveyController::class, 'showForGuest'])->name('surveys.by_slug');
    Route::post('/surveys/{survey}/answers', [SurveyController::class, 'storeAnswers'])->name('surveys.store_answers');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
});
