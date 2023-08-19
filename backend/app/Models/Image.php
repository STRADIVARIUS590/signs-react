<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class Image extends Model
{
    use HasFactory;

    protected $appends = [
        'url'
    ];

    protected $hidden = [
        'pivot'
    ];

    public function getUrlAttribute(){

        return URL::to('').'/storage/'.$this->get_folder().'/'.$this->name;
    }

    protected function get_folder(){
        $imageable = Imageable::where('image_id', $this->id)->first(); 

        return $imageable ? Str::plural(strtolower(class_basename($imageable->imageable_type))) : '';
    }
}
