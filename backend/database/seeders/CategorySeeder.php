<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Image;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode(file_get_contents('database/jsons/categories.json') ,true);

        foreach($data as $item){

            $category = Category::create([
                'name' => $item['name']
            ]);

            foreach($item['images'] as $item){
                $image = Image::create([
                    'name' => $item['name']
                ]);

                $category->images()->attach($image);
            }
        }
    }
}
