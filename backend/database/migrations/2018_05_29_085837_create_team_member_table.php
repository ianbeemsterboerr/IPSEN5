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
            $table->integer('user_id')->unsigned();;
            $table->integer('team_id')->unsigned();;

            $table->timestamps();

            $table->primary(['user_id', 'team_id']);
        });

        Schema::table('team_member', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('user');
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
        Schema::table('team_member', function(Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['team_id']);
        });
        Schema::dropIfExists('team_member');
    }
}
