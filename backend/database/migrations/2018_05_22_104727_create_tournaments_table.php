<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTournamentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tournament', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('organizer_user_id')->unsigned();;
			$table->string('gamename');
			$table->string('tournament_typename');
			$table->string('signup_typename');
			$table->string('name');
			$table->string('description');
			$table->integer('max_team_size');
			$table->date('signup_start');
			$table->date('signup_end');
			$table->date('tournament_start');
            $table->timestamps();
        });

        Schema::table('tournament', function(Blueprint $table) {
            $table->foreign('organizer_user_id')->references('id')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tournament', function(Blueprint $table) {
            $table->dropForeign(['organizer_user_id']);
        });

        Schema::dropIfExists('tournament');
    }
}
