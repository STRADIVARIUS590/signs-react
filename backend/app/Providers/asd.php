<?php

namespace App\Providers;

use App\Models\User;
use App\Services\TrainService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class asd extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->bind(TrainService::class, function(Application $app){
            return new TrainService(['detail', 'config_arrat', 'SHIT']);
        });

        $this->app->singleton('settings', function(){
            error_log(time());
            return User::get();
        }); 
    }
}
