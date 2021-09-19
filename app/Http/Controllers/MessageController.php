<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Messages;
use App\Events\MessageSent;

class MessageController extends Controller
{
    //
    public function index(){
        $messages = Messages::all();
        return response()->json(['chat'=>$messages]); 
    }

    public function postSendMessage(Request $request){
        $messages = Messages::create($request->all());
        // event(
        //     $e=new RedisEvent($messages)
        // );
        return response()->json([
            'chat'=>$messages,
            'status' => 'success',
        ]);
    }
}
