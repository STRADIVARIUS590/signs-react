<?php 

namespace App\Services;

class TrainService{

    public function __construct(public $config){

    }

    public function go(){
        return [
            'name' => 'goin ',
            'conf' => $this->config
        ];
    }
}