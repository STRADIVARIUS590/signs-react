<?php

use App\Http\Controllers\Api\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::controller(UserController::class)->prefix('/users')->group(static function(){
    Route::post('/login', 'login');
    Route::post('/', 'store');

});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function(){
        return User::get();
    });

    Route::controller(UserController::class)->prefix('/users')->group(function(){
        Route::get('/logout', 'logout');
    });
    
});