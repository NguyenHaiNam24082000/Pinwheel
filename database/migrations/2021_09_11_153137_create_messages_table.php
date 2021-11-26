<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('messages', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('username');
        //     $table->text('content');
        //     $table->boolean('status')->default(false);
        //     $table->timestamps();
        // });
        Schema::create('messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('sender_id');
            $table->foreign('sender_id')
                ->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('conversation_id');
            $table->foreign('conversation_id')
                ->references('id')->on('conversation')->onDelete('cascade');
            $table->enum('kind', ['text', 'video', 'audio', 'photo', 'document'])->default( 'text');
            $table->text('content');
            $table->string('effect')->default('');
            $table->unsignedBigInteger('reply_id')->nullable();
            $table->foreign('reply_id')->references('id')->on('messages')->onDelete('cascade');
            $table->boolean('is_remove')->default(0);
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
        Schema::dropIfExists('messages');
    }
}
