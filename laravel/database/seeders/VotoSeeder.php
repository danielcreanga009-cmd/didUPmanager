<?php

namespace Database\Seeders;

use App\Models\Materia;
use App\Models\Voto;
use Illuminate\Database\Seeder;

class VotoSeeder extends Seeder
{
    public function run(): void
    {
        $materiaIds = Materia::pluck('id')->all();

        if (empty($materiaIds)) {
            $this->command?->warn('Nessun voto creato: prima inserisci almeno una materia.');

            return;
        }

        $this->creaVotiPerQuadrimestre(20, '2026-09-15', '2027-01-31', $materiaIds);
        $this->creaVotiPerQuadrimestre(30, '2027-02-01', '2027-05-31', $materiaIds);

        $this->command?->info('Creati 20 voti nel primo quadrimestre e 30 nel secondo.');
    }

    private function creaVotiPerQuadrimestre(
        int $numeroVoti,
        string $dataInizio,
        string $dataFine,
        array $materiaIds
    ): void {
        Voto::factory()
            ->count($numeroVoti)
            ->state(fn () => [
                'materia_id' => fake()->randomElement($materiaIds),
                'data' => fake()->dateTimeBetween($dataInizio, $dataFine),
            ])
            ->create();
    }
}
