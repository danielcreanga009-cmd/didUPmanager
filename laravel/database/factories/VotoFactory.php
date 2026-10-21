<?php

namespace Database\Factories;

use App\Models\Voto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Voto>
 */
class VotoFactory extends Factory
{
    protected $model = Voto::class;

    public function definition(): array
    {
        return [
            'data' => fake()->dateTimeBetween('2026-09-15', '2027-05-31'),
            'voto_argo_id' => 'fake-' . fake()->unique()->uuid(),
            'commento' => fake()->randomElement([
                'Verifica scritta',
                'Interrogazione orale',
                'Prova pratica',
                'Lavoro di gruppo',
            ]),
            'valore' => fake()->randomElement([
                4,
                4.5,
                5,
                5.5,
                6,
                6.5,
                7,
                7.5,
                8,
                8.5,
                9,
                9.5,
                10,
            ]),
        ];
    }
}
