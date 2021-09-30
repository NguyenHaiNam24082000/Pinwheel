<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    function showContact(Request $request)
    {
        $conversation_id= DB::table('users')->join('participants', 'users.id',"=","participants.user_id")
        ->where('users.id','=',$request->userId)->select('conversation_id');
        return DB::table('users')->join('participants', 'users.id',"=","participants.user_id")
        ->join('conversation', 'participants.conversation_id','=','conversation.id')
        ->whereIn('conversation.id',$conversation_id)
        -> select('users.id','conversation.title','participants.title as alias','kind','avatar','conversation.id as conversationId')->get();

        //select * from `users` join `participants` on users.id=participants.user_id JOIN 
        //`conversation` on participants.conversation_id=conversation.id where conversation.id 
        //in (select conversation_id from `users` join `participants` on users.id=participants.user_id where users.id='100000000000001');
    }
}
