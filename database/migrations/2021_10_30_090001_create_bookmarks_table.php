<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookmarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('conversation_id');
            $table->foreign('conversation_id')
                ->references('id')->on('conversation')->onDelete('cascade');
            $table->unsignedBigInteger('creator_id');
            $table->foreign('creator_id')
            ->references('user_id')->on('participants')->onDelete('cascade');
            $table->unsignedBigInteger('editor_id')->nullable();
            $table->foreign('editor_id')
            ->references('user_id')->on('participants')->onDelete('cascade');
            $table->string('link');
            $table->string('title');
            $table->string('description');
            $table->string('icon');
            $table->timestamps();
        });
    }
   
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookmarks');
    }
}