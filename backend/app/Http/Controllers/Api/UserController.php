<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class UserController extends Controller
{
    
    public function login(Request $request){

        error_log(json_encode($request->all()));
        $user = User::whereName($request->name)->first();

        error_log(json_encode($user));
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                'message' => 'Ha ocurrido un error',
                'code' => -1,
                'data' => null
            ]);
        }

        $user->token = $user->createToken('session-token')->plainTextToken;
        return response()->json([
            'message' => 'Registro consultado correctamente',
            'code' => 1,
            'data' => $user
        ]);
    }


    public function logout(){
        request()->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesion cerrada correctamente',
            'code' => 1,
            'data' => null
        ]);
    }

    public function store(Request $request){
    
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required' 
        ]);

        if($validator->passes()){
            $user = User::create($request->all());
            return response()->json([
                'message' => 'Registro creado correctamente',
                'code' => 1,
                'data' => $user
            ]);
        }


        return response()->json([
            'message' => 'Ha ocurrido un error',
            'code' => -1,
            'data' => $validator->errors()->all()
        ]);
    }
}
