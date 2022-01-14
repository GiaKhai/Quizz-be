<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\Test;



Route::group([
  'middleware' => ['jwt.auth'],
  'prefix' => 'auth'

], function ($router) {
  Route::post('/logout', 'API\AuthController@logout');
  Route::get('/user-profile', 'API\AuthController@userProfile');
});

Route::group([
  'middleware' => ['jwt.refresh'],
  'prefix' => 'auth'

], function ($router) {
  Route::post('/refresh', 'API\AuthController@refresh');
});

Route::group([
  'prefix' => 'auth'

], function ($router) {
//   Route::post('/login', 'API\AuthController@login');
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/authenticate', [AuthController::class, 'getAuthUser']); 
  Route::post('/logout', [AuthController::class, 'logout']); 
  
  // Route::post('/register', 'API\AuthController@register');
});




Route::prefix('user')->name('users.')->group(function () {
    Route::get('', [UserController::class, 'getUser']); 
    Route::post('', [UserController::class, 'postUser']);
    Route::delete('/{id}', [UserController::class, 'destroy']); 
});

Route::get('question', [QuestionController::class,'getQuestion']);
Route::post('create_question', [QuestionController::class,'createQuestion']);
Route::delete('delete_question/{id}', [QuestionController::class,'deleteQuestion']);
Route::get('answer', [QuestionController::class,'getAnswer']);
Route::post('loading_question_test', [QuestionController::class,'loadingQuestionTest']);

Route::get('test-plan', [Test::class,'getPlanList']);
Route::post('test-plan', [Test::class,'postTestPlan']);
Route::delete('test-plan/{id}', [Test::class, 'destroy']);
Route::post('test-plan/{id}', [Test::class, 'updateTestPlan']);
Route::put('test-plan/{id}', [Test::class, 'updateInfoTestPlanExeptStatus']);

Route::get('test-list', [Test::class,'getTestList']);
Route::post('test-list', [Test::class,'postTestList']);
Route::put('test-list/{id}', [Test::class, 'updateTestItem']);
Route::delete('test-list/{id}', [Test::class, 'deleteTestItem']);

Route::post('check_plan', [Test::class,'checkPlan']);
Route::post('resultTest', [Test::class,'resultTest']);