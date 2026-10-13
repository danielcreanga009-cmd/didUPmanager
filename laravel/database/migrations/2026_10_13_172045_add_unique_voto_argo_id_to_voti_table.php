<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('voti', function (Blueprint $table) {
            $table->unique('voto_argo_id');
        });
    }

    public function down(): void
    {
        Schema::table('voti', function (Blueprint $table) {
            $table->dropUnique('voti_voto_argo_id_unique');
        });
    }
};
