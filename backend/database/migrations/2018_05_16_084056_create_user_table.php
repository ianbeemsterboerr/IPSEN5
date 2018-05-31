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
            $table->increments('id');
            $table->string('user_username', 20);
            $table->string('user_first_name', 32);
            $table->string('user_last_name', 32);
            $table->string('user_email',64);
            $table->string('user_description', 511)->nullable();
            $table->string('user_avatar_url', 255)->nullable();
            $table->char('user_salt', 126)->nullable();
            $table->char('user_password', 255)->nullable();
            $table->boolean('user_force_pw_change')->nullable()->default(0);
            $table->boolean('user_force_name_change')->nullable()->default(0);
            $table->boolean('user_guest')->nullable()->default(0);
            $table->string('user_webtoken')->nullable();
            $table->boolean('user_isadmin')->nullable()->default(0);
            $table->timestamps();

            $table->unique("user_username");
            $table->unique("user_email");
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
