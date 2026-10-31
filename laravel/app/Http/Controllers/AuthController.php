<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(){
        return view('login');
    }

    public function checkAccount(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string',
            'codScuola' => 'required|string|max:255',
        ]);

        $credenziali = [
            'name' => $validated['name'],
            'password' => $validated['password'],
            'codScuola' => $validated['codScuola'],
        ];

        
        $response = Http::timeout(60)->post('http://127.0.0.1:3000/verify-argo', $credenziali);//valid: true o false

        if ($response->json('valid')) {
            //crea utente se primo accesso e fare il login

            return redirect()->intended('/'); 
        } else{
            return redirect()->back()->with('error', 'Credenziali non valide');
        }
    }

    private function createUser(){

    }

}
