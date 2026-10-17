<?php

namespace App\Http\Controllers;

use App\Models\Voto;
use App\Models\Materia;
use Illuminate\Http\Request;

class VotiController extends Controller
{
    public function voti()
    {
        $materie = Materia::all();
        return view('voti', compact('materie'));
    }

    public function getVoti(Request $request)
    {
        $periodo = $this->getPeriodo($request);
        $query = Voto::with('materia');
        $this->applicaFiltroPeriodo($query, $periodo);

        $voti = $query->orderBy('data', 'desc')->get();

        return response()->json($voti);
    }

    public function getVotiMateria(Request $request, Materia $materia)
    {
        $periodo = $this->getPeriodo($request);
        $query = Voto::where('materia_id', $materia->id);
        $this->applicaFiltroPeriodo($query, $periodo);

        $voti = $query->orderBy('data', 'desc')->get();

        return response()->json($voti);
    }
    public function votiMateria(Materia $materia)
    {
        return view('votiMateria', compact('materia'));
    }

    private function getPeriodo(Request $request): string
    {
        $periodoPredefinito = now()->lt('2027-02-01') ? 'primo' : 'secondo';
        $periodo = $request->query('periodo', $periodoPredefinito);

        if (!in_array($periodo, ['primo', 'secondo', 'intero'], true)) {
            abort(response()->json(['message' => 'Periodo non valido.'], 422));
        }

        return $periodo;
    }

    private function applicaFiltroPeriodo($query, string $periodo): void
    {
        if ($periodo === 'primo') {
            $query->whereDate('data', '<', '2027-02-01');
        }

        if ($periodo === 'secondo') {
            $query->whereDate('data', '>=', '2027-02-01');
        }
    }

}
