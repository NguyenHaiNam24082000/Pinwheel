<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    //
         /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        // $user = User::create(["password"=>Hash::make($request->password),
        //         "name"=>$request->name,
        //         "username"=>$request->username,
        //         "avatar"=>$request->avatar,
        //         "email"=>$request->email,
        //     ]);
        // return response()->json([
        //     'user'=>$user,
        //     'status' => 'success',
        // ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //
        $conversation = Conversation::where('id', $request->id)->get();
        return $conversation;
    }

    public function showUsers(Request $request)
    {
        //
        $conversation = DB::table('conversation')->join('participants','participants.conversation_id','=','conversation.id')
        ->join('users','users.id','=','participants.user_id')
        ->where('conversation.id',"=", $request->conversation_id)->select('users.id','users.name','avatar')->get();
        return $conversation;
        //SELECT users.id,users.name,avatar from conversation join participants on conversation.id = 
        //participants.conversation_id 
        //join users on users.id= participants.user_id WHERE conversation.id='200000000000001';
    }

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
