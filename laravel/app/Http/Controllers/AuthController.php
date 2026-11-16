<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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

        $credenziali['idArgo'] = $response->json('idUtenteArgo');  //RESTITUISCE NULL, CONTROLLARE E RISOLVERE

        if ($response->json('valid')) {
            //crea utente se primo accesso e fare il login
            $user = User::where('name', $credenziali['name'])
            ->where('idArgo', $credenziali['idArgo'])
            ->first();

            if($user){
                Auth::login($user);
            } else{
                $user = User::create($credenziali);
                Auth::login($user);
            }

            return redirect()->route('welcome'); 
        } else{
            return redirect()->back()->with('error', 'Credenziali non valide');
        }
    }

}
