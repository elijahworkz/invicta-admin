<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTermsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('terms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('site')->default('default');
            $table->string('taxonomy');
            $table->string('title');
            $table->string('slug');
            $table->string('uri')->nullable();
            $table->json('data')->nullable();
            $table->timestamps();
        });

        Schema::create('termables', function (Blueprint $table) {
            $table->integer('term_id');
            $table->morphs('termable');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('terms');
        Schema::dropIfExists('termables');
    }
}
