<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;
    protected $table = "messages";
    protected $fillable = [ 'sender_id','content','conversation_id','kind','effect','is_seen'];
}
