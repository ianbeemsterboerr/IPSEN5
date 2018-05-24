<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('user_username', 20);
            $table->string('user_first_name', 32);
            $table->string('user_last_name', 32);
            $table->string('user_email',64);
            $table->string('user_description', 511);
            $table->string('user_avatar_url', 255);
            $table->char('user_salt', 126);
            $table->char('user_password', 255);
            $table->boolean('user_force_pw_change');
            $table->boolean('user_force_name_change');
            $table->boolean('user_guest');
            $table->timestamps();
            $table->string('user_webtoken');
            $table->boolean('user_isadmin');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
}
