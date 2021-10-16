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
    public function searchFriendToAdd(Request $request)
    {
        // select * from users WHERE users.id not in(select users.id from users join participants on users.id=participants.user_id 
        // join conversation on participants.conversation_id= conversation.id where conversation.id in ( select conversation_id from users
        //  join participants on users.id= participants.user_id where users.id=6) and kind='friend') AND name LIKE '%a%';
        $str = strtolower($request->name);
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
		$str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
		$str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
		$str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
		$str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
		$str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
		$str = preg_replace("/(đ)/", 'd', $str);
		$str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
		$str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
		$str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
		$str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
		$str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
		$str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
		$str = preg_replace("/(Đ)/", 'D', $str);
		$str = preg_replace("/(\“|\”|\‘|\’|\,|\!|\&|\;|\@|\#|\%|\~|\`|\=|\_|\'|\]|\[|\}|\{|\)|\(|\+|\^)/", '-', $str);
		$str = preg_replace("/( )/", '-', $str);

        $conversationId= DB::table('users')->join('participants', 'users.id',"=","participants.user_id")
        ->where('users.id','=',$request->userId)->select('conversation_id');

        $usersId=DB::table('users')->join('participants', 'users.id',"=","participants.user_id")
        ->join('conversation','conversation.id','participants.conversation_id')
        ->whereIn( 'conversation.id',$conversationId)
        ->where('kind','=','friend')
        ->select('users.id');

        return DB::table('users') 
        -> whereNotIn('users.id',$usersId) 
        ->where ('name','like','%'.$str.'%')
        ->select('users.id','name','avatar')->get();
      
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