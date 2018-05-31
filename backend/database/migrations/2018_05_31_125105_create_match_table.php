<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMatchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('match', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parent_match_id')->unsigned();
            $table->integer('tournament_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('match', function (Blueprint $table) {
            $table->foreign('parent_match_id')->references('id')->on('match');
            $table->foreign('tournament_id')->references('id')->on('tournament');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('match', function (Blueprint $table) {
            $table->dropForeign(['parent_match_id']);
            $table->dropForeign(['tournament_id']);
        });

        Schema::dropIfExists('match');
    }
}
