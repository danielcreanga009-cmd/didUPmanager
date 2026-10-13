<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $table = 'materie';

    public function compiti()
    {
        return $this->hasMany(Compito::class);
    }
}
