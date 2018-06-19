<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('result', function (Blueprint $table) {
            $table->integer('opponent_id')->unsigned();
            $table->integer('score');
            $table->timestamps();

            $table->foreign('opponent_id')->references('id')->on('opponent')->onDelete('CASCADE');
            $table->primary('opponent_id');
        });

        Schema::create('result_special', function (Blueprint $table) {
            $table->integer('result_opponent_id')->unsigned();
            $table->binary('data');
            $table->timestamps();

            $table->foreign('result_opponent_id')->references('opponent_id')->on('result')->onDelete('CASCADE');
            $table->primary('result_opponent_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('result', function (Blueprint $table) {
            $table->dropForeign(['opponent_id']);
        });

        Schema::table('result_special', function (Blueprint $table) {
            $table->dropForeign(['result_opponent_id']);
        });

        Schema::dropIfExists('result');
        Schema::dropIfExists('result_special');
    }
}
