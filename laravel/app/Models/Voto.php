<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voto extends Model
{
    protected $table = 'voti';

    public function materia(){
        return $this->belongsTo(Materia::class);
    }
}
