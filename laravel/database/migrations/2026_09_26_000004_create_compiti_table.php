<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('compiti', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lezione_id');
            $table->foreignId('materia_id')->constrained('materie');
            $table->text('testo');
            $table->date('data_consegna');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('compiti');
    }
};
