<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('compiti', 'identificatore')) {
            Schema::table('compiti', function (Blueprint $table) {
                $table->string('identificatore', 64)->nullable()->after('data_consegna');
            });
        }

        DB::statement("\n            UPDATE compiti\n            SET identificatore = SHA2(\n                CONCAT(lezione_argo_id, '|', data_consegna, '|', testo),\n                256\n            )\n        ");

        Schema::table('compiti', function (Blueprint $table) {
            $table->unique('identificatore');
        });
    }

    public function down(): void
    {
        Schema::table('compiti', function (Blueprint $table) {
            $table->dropUnique('compiti_identificatore_unique');
            $table->dropColumn('identificatore');
        });
    }
};
