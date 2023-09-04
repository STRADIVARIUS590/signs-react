<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\GameController;
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

 Auth::loginUsingId(1); 
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
    

    Route::controller(GameController::class)->prefix('/game')->group(function(){
        Route::get('/{category_id?}', 'new_game');
        Route::post('/', 'check');
    });

});

Route::controller(CategoryController::class)->prefix('/categories')->group(function(){
    Route::get('/', 'index');
    Route::get('/{id}', 'show');
});