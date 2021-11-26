<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Messages;
// use App\Events\MessageSent;
use Illuminate\Http\Request;



class MessageController extends Controller
{
    //
    public function index(Request $request){
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

    
    public function show(Request $request){
        $messages = DB::select('SELECT sender_id as id,name,content,effect,kind,avatar,phone,messages.conversation_id as selectedConversationId,messages.updated_at,messages.created_at,messages.id as message_id from messages,participants,users WHERE participants.user_id=messages.sender_id and users.id=participants.user_id and 
        messages.conversation_id='.$request->conversation_id.' and messages.conversation_id = participants.conversation_id order by messages.created_at');
        
        // table(DB::raw('messages, participants, users'))
        // ->where('participants.user_id', '=','messages.sender_id')
        // ->where('users.id','=','participants.user_id')
        // ->where('messages.conversation_id','=','participants.conversation_id')
        // ->where('messages.conversation_id', '=',$request->conversation_id)
        // ->get();
        // $messages = Messages::all();
        //SELECT * from `messages`,participants,users WHERE participants.user_id=messages.sender_id and users.id=participants.user_id and 
        //messages.conversation_id='200000000000001' and messages.conversation_id = participants.conversation_id;
        return response()->json(['chat'=>$messages]);
    }

    public function hideAndShowMessage(Request $request){
        $upadateMessages= Messages::where('sender_id',$request->sender_id)
        ->where('conversation_id','=',$request->conversation_id)
        ->update($request->all());  
        return response()->json([
            'messages'=>$upadateMessages,
            'status' => 'success',
        ]);
    }
}
