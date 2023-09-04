<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function Laravel\Prompts\error;

class Category extends Model
{
    use HasFactory;

    protected $appends = [
        'image',
        'question_count'
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

    public function getQuestionsAttribute(){
        return $this->data()
                    ->with(['questions'])->get()->pluck('questions')->flatten();
    }

    public function getQuestionCountAttribute(){
        return $this->getQuestionsAttribute()->count();
    }
}
