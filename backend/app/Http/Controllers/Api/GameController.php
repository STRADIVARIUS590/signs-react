<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Question;
use App\Models\Streak;
use Illuminate\Container\Container;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function new_game($id = null){
    
        $category =  (!is_null($id)) ? Category::find($id) : Category::has('data')->inRandomOrder()->first();
    
        $streak = Streak::create([
            'token' => uniqid(),
            'user_id' => Auth::user()->id,
            'correct' => 0,
            'incorrect' => 0,
            'finnished' => false,
            'score' => 0,
            'category_id' => $category->id
        ]);

        $ronda = $this->set_up_question($category);

        $streak->questions()->attach($ronda['question'], ['status' => Question::$statuses[0]]);   


        return response()->json([
            'message' => 'Registro creado correctamente',
            'data' => [
                'question' => $ronda['question'],
                'options' => $ronda['options'],
                'meta' => [
                    'correct' => $streak->correct,
                    'incorrect' => $streak->incorrect,
                    'token' => $streak->token,
                    'finnished' => false,
                    'score' => 0
                ]
            ]
        ]);
    }

    public function check(Request $request){

        $update_streak_data = [];
        
        $streak = Streak::firstWhere('token', $request->token);

        // $streak->update(['token' => uniqid()]);

        $current_question = $streak->questions()->wherePivot('status', Question::$statuses[0])->first();
        
        $streak->questions()->updateExistingPivot($current_question, ['status' => Question::$statuses[1]]);
                
        // validar respuesta
        $is_correct = $current_question->answers->first()->id == $request->answer_id;


        error_log(json_encode($current_question->answers->first()));

        error_log($current_question->answers->first()->id.  '<= ID PREGUNTA -----------------   ID RESPUESTA=> '. $request->answer_id);
   
    
        if($is_correct){
            $update_streak_data['score'] = $streak->score + 1;
            $update_streak_data['correct'] = $streak->correct + 1;    
        }else{
            $update_streak_data['incorrect'] = $streak->incorrect + 1;    
        }

        $streak->update($update_streak_data);


        // terminar el intento si se solicita
        if($request->has('finnish') && $request->finnish == true){
            $update_streak_data['finnished'] = true;
            $streak->update($update_streak_data);

            return response()->json([
                'message' => 'Ronda terminada correctamente',
                'code' => 2,
                'data' => $streak
            ]);
        } 
        $ronda = $this->set_up_question($streak->category);

        $streak->questions()->attach($ronda['question'], ['status' => Question::$statuses[0]]);   

         return response()->json([
       
            'message' => 'Registro creado correctamente',
            'data' => [
                'question' => $ronda['question'],
                'options' => $ronda['options'],
                'meta' => [
                    'correct' => $streak->correct,
                    'incorrect' => $streak->incorrect,
                    'token' => $streak->token,
                    'finnished' => false,
                    'score' => $streak->score
                ]
            ]
        ]);
    }

    public function set_up_question($category){

        // pregunta aleatoria
        $question = $category->questions->random();

        // respuesta correcta
        $answer = $question->answers->first();

        error_log($question->id. ' = = = = = ' . $answer->id);
        // mezclamos 3 opciones mas
        $wrong = $category->data->whereNotIn('id', [$answer->id])->random(3)->add($answer);

        $options = $wrong->shuffle();

        $options->load('images');  

        return [
            'question' => $question,
            'options' => $options
        ];

    }

}
