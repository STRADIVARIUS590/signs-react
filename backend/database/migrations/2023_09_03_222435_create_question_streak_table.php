<?php

use App\Models\Question;
use App\Models\Streak;
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
        Schema::create('question_streak', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Question::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Streak::class)->nullable()->constrained()->cascadeOnDelete();
            $table->set('status', [Question::$statuses]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_streak');
    }
};
