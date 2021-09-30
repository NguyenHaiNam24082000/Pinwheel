<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $table = "conversation";
    protected $fillable = [
        'id',
        'creator_id',
        'title',
        'kind'
    ];
}
