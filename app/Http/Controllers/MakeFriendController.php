<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Participant;
use Illuminate\Support\Facades\DB;
class MakeFriendController extends Controller
{

    public function postFriendIntoConversation(Request $request)
    {
    
    $conversation = Conversation::create($request->all());
   
    return response()->json([
        'makefriend'=>$conversation,
        'status' => 'success',
    ]);
   

    }
    public function postFriendIntoPaticipant(Request $request)
    {
        $paticipant = Participant::create($request->all());
   
        return response()->json([
            'postPaticipant'=>$paticipant,
            'status' => 'success',
        ]);
        

    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUsers( Request $request)
    {
        // select users.id from users WHERE users.id not in(select users.id  from users join participants
        //  on users.id=participants.user_id  join conversation on participants.conversation_id= conversation.id where conversation.id 
        //  in ( select conversation_id from users join participants on users.id= participants.user_id where users.id=6)  and kind='friend');
        $conversationId= DB::table('users')->join('participants', 'users.id',"=","participants.user_id")
        ->where('users.id','=',$request->userId)->select('conversation_id');

        $usersId=DB::table('users')->join('participants', 'users.id',"=","participants.user_id")
        ->join('conversation','conversation.id','participants.conversation_id')
        ->whereIn( 'conversation.id',$conversationId)
        ->where('kind','=','friend')
        ->select('users.id');

        return DB::table('users') 
        -> whereNotIn('users.id',$usersId) 
        ->select('users.id','name','avatar')->paginate(3);
        // return  $conversationId;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}