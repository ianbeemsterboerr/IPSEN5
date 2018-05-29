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
            $table->integer('tournamentID')->unsigned();
            $table->integer('teamID')->unsigned();
            $table->timestamps();

            $table->primary(['tournamentID', 'teamID']);
        });

        Schema::table('enrollment', function (Blueprint $table) {
            $table->foreign('tournamentID')->references('ID')->on('tournament');
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
            $table->dropForeign(['tournamentID']);
        });
        Schema::dropIfExists('enrollment');
    }
}
