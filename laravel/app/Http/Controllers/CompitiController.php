<?php

namespace App\Http\Controllers;

use App\Models\Compito;

class CompitiController extends Controller
{
    public function compiti()
    {
        $compiti = Compito::where('data_consegna', '>', now()->toDateString())
            ->orderBy('data_consegna')
            ->with('materia')
            ->get();

        return view('compiti', compact('compiti'));
    }

    private function eliminaCompitiVecchi()
    {
        Compito::where('data_consegna', '<', now()->toDateString())->delete();
    }
}
