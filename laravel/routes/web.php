<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompitiController;
use App\Http\Controllers\VotiController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {

    Route::get('/compiti', [CompitiController::class, 'compiti']);

    Route::get('/voti', [VotiController::class, 'voti'])->name('voti');

    Route::get('/api/voti', [VotiController::class, 'getVoti']);

    Route::get('/voti/{materia}', [VotiController::class, 'votiMateria']);

    Route::get('/api/voti/{materia}', [VotiController::class, 'getVotiMateria']);

});


Route::get('/login', [AuthController::class, 'login'])->name('login');

Route::post('/login', [AuthController::class, 'checkAccount'])->name('checkAccount');

