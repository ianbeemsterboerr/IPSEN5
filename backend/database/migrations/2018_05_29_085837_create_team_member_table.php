<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamMemberTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_member', function (Blueprint $table) {
            $table->integer('userID')->unsigned();;
            $table->integer('teamID')->unsigned();;

            $table->timestamps();

            $table->primary(['userID', 'teamID']);
        });

        Schema::table('team_member', function(Blueprint $table) {
            $table->foreign('userID')->references('user_id')->on('user');
            $table->foreign('teamID')->references('ID')->on('team');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('team_member', function(Blueprint $table) {
            $table->dropForeign(['userID']);
            $table->dropForeign(['teamID']);
        });
        Schema::dropIfExists('team_member');
    }
}
