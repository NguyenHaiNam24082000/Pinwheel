<?php
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MakeFriendController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\AttachmentController;

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
Route::get('chat/get',[MessageController::class, 'show']);
Route::post('user/post',[UserController::class, 'store']);
Route::get('user/getInfo',[UserController::class, 'show']);
Route::get('participant/getParticipant',[ParticipantController::class, 'show']);
Route::get('conversation/getConversation',[ConversationController::class, 'show']);
Route::get('conversation/getUsers',[ConversationController::class, 'showUsers']);
Route::get('/getContact',[ConversationController::class, 'showContact']);
Route::get('/search',[SearchController::class, 'searchFriend']);
Route::get('/getlistusers',[MakeFriendController::class, 'getUsers']);
Route::post('/postConversation',[MakeFriendController::class, 'postFriendIntoConversation']);
Route::post('/postPaticipant',[MakeFriendController::class, 'postFriendIntoPaticipant']);
Route::get('/searchInAddfriend',[MakeFriendController::class, 'searchFriendToAdd']);
Route::get('/getImage',[MessageController::class, 'getImage']);
Route::get('/getAllBookmark',[BookmarkController::class, 'getLinkBookmark']);
Route::post('/postBookmark',[BookmarkController::class, 'postLinkBookmark']);
Route::get('/getalllink',[AttachmentController::class, 'getAllLink']);
Route::put('/updateBookmark',[BookmarkController::class, 'updateLinkBookmark']);
Route::get('/deleteBookmark',[BookmarkController::class, 'deleteLinkBookmark']);
Route::put('/showandhidemessage',[MessageController::class, 'hideAndShowMessage']);
Route::post('/uploadImage', [AttachmentController::class, 'uploadImage'])->name('images');