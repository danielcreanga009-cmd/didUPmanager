<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voti', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('materia_id')->constrained('materie');
            $table->date('data');
            $table->string('voto_argo_id');
            $table->string('commento');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voti');
    }
};
