<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;
    protected $table = "attachments";
    protected $fillable = [ 'id','messages_id','attachment_tumb_url','attachment_url'];
}
