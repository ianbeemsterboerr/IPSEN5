<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOpponentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opponent', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('match_id')->unsigned();
            $table->integer('team_id')->unsigned();
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('match')->onDelete('CASCADE');
            $table->foreign('team_id')->references('id')->on('team');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('opponent', function (Blueprint $table) {
            $table->dropForeign(['match_id']);
            $table->dropForeign(['team_id']);
        });

        Schema::dropIfExists('opponent');
    }
}
