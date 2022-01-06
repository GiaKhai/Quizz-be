<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;

use App\Http\Controllers\PostController;


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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(['middleware' => ['jwt.auth','api-header']], function () {

//     // all routes to protected resources are registered here
//     Route::get('users/list', function(){
//         $users = App\User::all();

//         $response = ['success'=>true, 'data'=>$users];

//         return response()->json($response, 201);
//     });
// });
// Route::group(['middleware' => 'api-header'], function () {
//     // Route::post('user/login', 'UserController@login');
//     // Route::post('user/register', 'UserController@register');
//     Route::post('user/login', [UserController::class, 'login']); 
//     Route::post('user/register', [UserController::class, 'register']); 
// });

// Route::prefix('posts')->name('posts.')->group(function () {
//     Route::get('', [PostController::class, 'index']); 
// });

// Route::prefix('user')->name('user.')->group(function () {
//     Route::get('user', [UserController::class, 'getUser']); 
// });