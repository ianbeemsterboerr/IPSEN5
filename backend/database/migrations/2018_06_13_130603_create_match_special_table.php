<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMatchSpecialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('match_special', function (Blueprint $table) {
            $table->integer('match_id')->unsigned();
			$table->binary('data');
            $table->timestamps();
        });
		
		Schema::table('match_special', function (Blueprint $table) {
            $table->foreign('match_id')->references('id')->on('match');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('match_special');
    }
}
