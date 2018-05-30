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
            $table->increments('id');
            $table->integer('leader_user_id')->unsigned();;
            $table->string('name');
            $table->integer('size');
            $table->integer('max_size');
            $table->timestamps();

            $table->unique('name');
        });

        Schema::table('team', function($table) {
            $table->foreign('leader_user_id')->references('id')->on('user');
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
            $table->dropForeign(['leader_user_id']);
        });

        Schema::dropIfExists('team');
    }
}
