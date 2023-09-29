<?php

namespace Database\Seeders;

use App\Models\Data;
use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\View;

use function Laravel\Prompts\error;

class QuestionSeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $data =  json_decode(file_get_contents('database/jsons/questions.json'), true);

        // foreach($data as $item){
            
        /*     $q = Question::create([
                'text' => $item['text'],
                'answer_type' => count( $item['answers']) > 1 ? 'MANY':'SINGLE'
            ]);

            // error_log(json_encode($item['answers']));
            foreach($item['answers'] as $answer){
                
                $data = Data::where('meaning', $answer['meaning'])->first();
            
                if($data){
                    $q->answers()->attach($data);
                }else{
                    Data::create([
                        'description' => 
                    ])
                }
            
            }
 */

 // abecedario 
            $a = Data::whereHas('categories', function($q){
                $q->where('name', 'Abecedario');
            })->get();
            
            foreach($a as $d){

                $question = Question::create([
                    'answer_type' => 'SINGLE',
                    'text' => 'Como de dice la letra '.$d['meaning']
                ]);

                $question->answers()->attach($d);                
            }
        // }


        // calendario 
            $a = Data::whereHas('categories', function($q){
                $q->where('name', 'Calendario');
            })->get();

            foreach($a as $d){

                $question = Question::create([
                    'answer_type' => 'SINGLE',
                    'text' => 'Que como se dice '.$d['meaning']
                ]);

                $question->answers()->attach($d);
            }


            // animales
            $a = Data::whereHas('categories', function($q){
                $q->where('name', 'Animales');
            })->get();

            foreach($a as $d){
                
                $question = Question::create([
                    'answer_type' => 'SINGLE',
                    'text' => 'Como se dice '.$d['meaning']
                ]);

                $question->answers()->attach($d);
            }

            // alimentos
            $a = Data::whereHas('categories', function($q){
                $q->where('name', 'Alimentos');
            })->get();

            foreach($a as $d){

                $question = Question::create([
                    'answer_type' => 'SINGLE',
                    'text' => 'Como se dice '.$d['meaning']
                ]);

                $question->answers()->attach($d);
            }


            // cuerpo humano

            $a = Data::whereHas('categories', function($q){
                $q->where('name', 'Cuerpo humano');
            })->get();

            foreach($a as $d){

                $question = Question::create([
                    'answer_type' => 'SINGLE',
                    'text' => 'Como se dice '.$d['meaning']
                ]);

                $question->answers()->attach($d);
            }


            // colores
            $a = Data::whereHas('categories', function($q){
                $q->where('name', 'Colores');
            })->get();

            foreach($a as $d){

                $question = Question::create([
                    'text' => 'Como se dice '.$d['meaning'],
                    'answer_type' => 'SINGLE'
                ]);

                $question->answers()->attach($d);
            }

            // numeros
            $a = Data::whereHas('categories', function($q){
                $q->where('name', 'Numeros');
            })->get();

            foreach($a as $d){

                $question = Question::create([
                    'text' => 'Como se dice '.$d['meaning'],
                    'answer_type' => 'SINGLE'
                ]);

                $question->answers()->attach($d);
            }
            
            // adjetivos
            $a = Data::whereHas('categories', function($q){
                $q->where('name', 'Adjetivos');
            })->get();

            foreach($a as $d){

                $question = Question::create([
                    'text' => 'Como se dice '.$d['meaning'],
                    'answer_type' => 'SINGLE'
                ]);

                $question->answers()->attach($d);
            }


    }


}
