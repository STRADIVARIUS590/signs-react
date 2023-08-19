<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::get();
        
        if($categories){
            
            return response()->json([
                'message' => 'Registro consultado correctamente',
                'code' => 1,
                'data' => $categories
            ]);
        }


        return response()->json([
            'message' => 'Ha ocurrido un error',
            'code' => -1,
            'data'=> null
        ]);
    }

    public function show($id){
        $category = Category::with('data.images')->find($id);

        if($category){
            return response()->json([
                'message' => 'Registro consultado correctamente',
                'code' => 1,
                'data' => $category 
            ]);
        }

        return response()->json([
            'message' => 'Ha ocurrido un error',
            'code' => -1,
            'data' => null
        ]);
    }
}
