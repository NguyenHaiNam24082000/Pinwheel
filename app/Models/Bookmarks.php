<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmarks extends Model
{
    use HasFactory;
    protected $table = "bookmarks";
    protected $fillable = [ 'id','conversation_id','creator_id','editor_id','link','title','description','icon'];
}
