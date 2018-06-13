<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEnrollmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrollment', function (Blueprint $table) {
            $table->integer('tournament_id')->unsigned();
            $table->integer('team_id')->unsigned();
            $table->timestamps();

            $table->primary(['tournament_id', 'team_id']);
        });

        Schema::table('enrollment', function (Blueprint $table) {
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
        Schema::table('enrollment', function (Blueprint $table) {
            $table->dropForeign(['tournament_id']);
        });
        Schema::dropIfExists('enrollment');
    }
}
