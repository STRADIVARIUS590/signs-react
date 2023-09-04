<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Streak extends Model
{
    use HasFactory;

    protected $fillable = [
        'token',
        'user_id',
        'correct',
        'incorrect',
        'finnished',
        'score',
        'category_id'
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function questions(){
        return $this->belongsToMany(Question::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

}
