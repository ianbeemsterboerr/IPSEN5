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
            $table->string('username', 20);
            $table->string('first_name', 32);
            $table->string('last_name', 32);
            $table->string('email',64);
            $table->string('description', 511)->nullable();
            $table->string('avatar_url', 255)->nullable();
            $table->char('salt', 126)->nullable();
            $table->char('password', 255)->nullable();
            $table->boolean('force_pw_change')->nullable()->default(0);
            $table->boolean('force_name_change')->nullable()->default(0);
            $table->boolean('guest')->nullable()->default(0);
            $table->string('webtoken')->nullable();
            $table->boolean('isadmin')->nullable()->default(0);
            $table->timestamps();

            $table->unique("username");
            $table->unique("email");
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
