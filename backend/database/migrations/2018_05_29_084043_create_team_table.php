<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team', function (Blueprint $table) {
            $table->increments('ID');
            $table->integer('leader_userID')->unsigned();;
            $table->string('name');
            $table->integer('size');
            $table->integer('max_size');
            $table->timestamps();

            $table->unique('name');
        });

        Schema::table('team', function($table) {
            $table->foreign('leader_userID')->references('user_id')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('team', function(Blueprint $table) {
            $table->dropForeign(['leader_userID']);
        });

        Schema::dropIfExists('team');
    }
}
