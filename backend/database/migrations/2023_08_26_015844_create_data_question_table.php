<?php

use App\Models\Data;
use App\Models\Question;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_question', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Data::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Question::class)->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_question');
    }
};
