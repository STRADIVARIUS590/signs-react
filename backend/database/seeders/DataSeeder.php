<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Data;
use App\Models\Image;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function Laravel\Prompts\error;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode( file_get_contents('database/jsons/data.json'), true);
     
        foreach($data as $item){
            // error(json_encode($item));
            $data = Data::create([
                'meaning' => $item['meaning']
            ]);

            foreach($item['images'] as $image_data){
                $image = Image::create([
                    'name' => $image_data['name']
                ]);

                $data->images()->attach($image);
            }

            // error_log(json_encode($item));
            $categories = Category::get();
            foreach($item['categories'] as $category_data){
                $category = $categories->where('name', $category_data['name'])->first();

                if($category){
                    $data->categories()->attach($category);
                }

            }
            
        }
    }
}
