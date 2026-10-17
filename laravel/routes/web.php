<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompitiController;
use App\Http\Controllers\VotiController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/compiti', [CompitiController::class, 'compiti']);

Route::get('/voti', [VotiController::class, 'voti'])->name('voti');

Route::get('/api/voti', [VotiController::class, 'getVoti']);

Route::get('/voti/{materia}', [VotiController::class, 'votiMateria']);

Route::get('/api/voti/{materia}', [VotiController::class, 'getVotiMateria']);