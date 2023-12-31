<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public static $statuses = ['CURRENT', 'NO_RETURN', 'PASSED'];

    public function answers(){
        return $this->belongsToMany(Data::class);
    }    
}
