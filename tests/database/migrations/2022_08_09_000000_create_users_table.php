<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('faculty_id')->nullable();
            $table->boolean('dev')->default(false);
            $table->timestamp('last_login')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        $tables = config('invicta.auth_tables');

        Schema::create($tables['groups'], function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->timestamps();
        });

        Schema::create($tables['group_user'], function (Blueprint $table) use ($tables) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('group_id')->constrained($tables['groups'])->onDelete('cascade');
            $table->primary(['user_id', 'group_id']);
        });

        Schema::create($tables['permissions'], function (Blueprint $table) use ($tables) {
            $table->id();
            $table->foreignId('group_id')->contrained($tables['groups'])->onDelete('cascade');
            $table->string('ability');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        $tables = config('invicta.auth_tables');
        Schema::dropIfExists($tables['groups']);
        Schema::dropIfExists($tables['group_user']);
        Schema::dropIfExists($tables['permissions']);
    }
};
