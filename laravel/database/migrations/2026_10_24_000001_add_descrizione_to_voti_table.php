<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('voti', function (Blueprint $table) {
            $table->string('descrizione')->nullable()->after('commento');
        });
    }

    public function down(): void
    {
        Schema::table('voti', function (Blueprint $table) {
            $table->dropColumn('descrizione');
        });
    }
};
