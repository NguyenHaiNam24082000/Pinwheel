<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use App\Models\Bookmarks;
use Illuminate\Http\Request;

class BookmarkController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    function postLinkBookmark(Request $request)
    {
        $bookmarks = Bookmarks::create($request->all());
        return response()->json(['bookmarks'=>$bookmarks]);
    }
    function getLinkBookmark(Request $request)
    {
        $bookmark = DB::table('bookmarks')->join('conversation', 'conversation.id',"=","bookmarks.conversation_id")
        ->where('conversation.id','=',$request->conversation_id)
        ->select('bookmarks.id','conversation_id','link','bookmarks.title','description','icon')
        ->get();
        return $bookmark;
    }
    function deleteLinkBookmark(Request $request)
    {
        $bookmarks = DB::table('bookmarks')
        ->where('id','=',$request->id)
        ->where('conversation_id','=',$request->conversation_id)
        ->delete();
        return response()->json(['status' => 'delete successfull']);
    }
    function updateLinkBookmark(Request $request)
    {
        $upadatebookmark= Bookmarks::where('id',$request->id)
        ->where('conversation_id','=',$request->conversation_id)
        ->update($request->all());
       
        return response()->json([
            'bookmark'=>$upadatebookmark,
            'status' => 'success',
        ]);
    
    }

}