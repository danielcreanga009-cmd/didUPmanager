<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Compito extends Model
{
    protected $table = 'compiti';

    public function materia(){
        return $this->belongsTo(Materia::class);
    }
}
