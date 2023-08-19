<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $appends = [
        'image'
    ];

    
    public function images(){
        return $this->morphToMany(Image::class, 'imageable');
    }

    public function data(){
        return $this->belongsToMany(Data::class);
    }

    public function getImageAttribute(){
        return $this->images()->first();
    }
}
