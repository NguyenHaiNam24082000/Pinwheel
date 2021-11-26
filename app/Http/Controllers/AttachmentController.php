<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AttachmentController extends Controller
{
    //
    public function getImage(Request $request)
    {
        return DB::table('messages')
        ->where('conversation_id','=',$request->conversation_id)
        ->where('kind','=','photo')
        ->get();
    }
    public function getVideo(Request $request)
    {
        return DB::table('messages')
        ->where('conversation_id','=',$request->conversation_id)
        ->where('kind','=','photo')
        ->get();
    }
    public function getDocs(Request $request)
    {
        return DB::table('messages')
        ->where('conversation_id','=',$request->conversation_id)
        ->where('kind','=','photo')
        ->get();
    }

    public function getAllLink(Request $request)
    {
        return DB::table('messages')->join('attachments', 'attachments.messages_id','=','messages.id')
        ->where('kind','!=','text')
        ->where('conversation_id','=',$request->conversation_id)
        ->get();
    }
    // public function getDocs(Request $request)
    // {
    //     return DB::table('messages')
    //     ->where('conversation_id','=',$request->conversation_id)
    //     ->where('kind','=','photo')
    //     ->get();
    // }

}
