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
        Schema::create('tournaments', function (Blueprint $table) {
            $table->increments('ID');
			$table->integer('organizer_userID');
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
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tournaments');
    }
}
