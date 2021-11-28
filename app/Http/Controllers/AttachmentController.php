<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Attachment;

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

    public function uploadImage(Request $request)
    {
        $imagesName = [];
        $response = [];
        if($request->has('images')){ 
            $tmp = $request->file('images');
            $index=0;
            foreach($request->file('images') as $image) {
                $filename = time().'-'.$index.'.'.$image->getClientOriginalExtension();
                $image->move('upload/images', $filename);
                $index+=1;
                array_push($imagesName,$filename);
                Attachment::create([
                    'messages_id' => $request->message_id,
                    "attachment_tumb_url" => "http://localhost:2408/upload/images/".$filename,
                ]);
            }

            $response["status"] = "successs";
            $response["message"] = "Success! image(s) uploaded";
            $response["image"]=$imagesName;
        }
        return response()->json($response);

        }
    }
    // public function getDocs(Request $request)
    // {
    //     return DB::table('messages')
    //     ->where('conversation_id','=',$request->conversation_id)
    //     ->where('kind','=','photo')
    //     ->get();
    // }

