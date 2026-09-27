<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('materie', function (Blueprint $table) {
            $table->string('argo_id')->unique();
        });

        Schema::table('compiti', function (Blueprint $table) {
            $table->renameColumn('lezione_id', 'lezione_argo_id');
        });

        Schema::table('compiti', function (Blueprint $table) {
            $table->string('lezione_argo_id')->change();
        });
    }

    public function down(): void
    {
        Schema::table('compiti', function (Blueprint $table) {
            $table->unsignedBigInteger('lezione_argo_id')->change();
        });

        Schema::table('compiti', function (Blueprint $table) {
            $table->renameColumn('lezione_argo_id', 'lezione_id');
        });

        Schema::table('materie', function (Blueprint $table) {
            $table->dropUnique('materie_argo_id_unique');
            $table->dropColumn('argo_id');
        });
    }
};
