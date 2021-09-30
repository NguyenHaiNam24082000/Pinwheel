<?php
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\Controller;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('chat',[MessageController::class, 'index']);
Route::post('chat/post',[MessageController::class, 'postSendMessage']);
Route::post('user/post',[UserController::class, 'store']);
Route::get('user/getInfo',[UserController::class, 'show']);
Route::get('participant/getParticipant',[ParticipantController::class, 'show']);
Route::get('conversation/getConversation',[ConversationController::class, 'show']);
Route::get('/getContact',[ConversationController::class, 'showContact']);