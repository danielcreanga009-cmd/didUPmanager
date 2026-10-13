<?php

namespace App\Http\Controllers;
use App\Models\Voto;
class VotiController extends Controller
{
    public function voti()
    {
        return view('voti');
    }

    public function getVoti()
    {
        $voti = Voto::with('materia')->get();

        return response()->json($voti);
    }
}
