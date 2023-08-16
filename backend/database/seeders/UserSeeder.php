<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        User::create([
            'name' => 'test', 
            'email' => 'test@example.com',
            'password' => bcrypt('123456789'),
        ]);


        User::create([
            'name' => 'griv', 
            'email' => 'griv@example.com',
            'password' => bcrypt('123456789'),
        ]);
    }
}
