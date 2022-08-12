<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseStudentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_student', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id')->unsigned();
            $table->unsignedBigInteger('course_id')->unsigned();
            $table->string('status', 50)->default('in_progress')->comment('in progress - watched; completed - checked as completed');
            $table->timestamps();

            $table
                ->foreign('student_id')
                ->references('id')
                ->on('students')
                ->onDelete('cascade');

            $table
                ->foreign('course_id')
                ->references('id')
                ->on('courses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('course_student');
    }
}
