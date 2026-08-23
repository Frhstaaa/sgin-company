<?php

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
        Schema::create('production_processes', function (Blueprint $table) {
            $table->id();
            $table->string('step_number')->default('01');
            $table->string('category')->default('main_flow'); // main_flow, qc, forging, logistics, machining, packaging
            $table->string('title_id');
            $table->string('title_jp')->nullable();
            $table->string('title_en')->nullable();
            $table->text('description_id');
            $table->text('description_jp')->nullable();
            $table->text('description_en')->nullable();
            $table->string('location_badge')->nullable(); // e.g. 'Pabrik Jepang', 'Pengiriman Laut', 'Pabrik Indonesia'
            $table->string('icon')->default('cog');
            $table->string('image_url')->nullable();
            $table->json('specs')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_processes');
    }
};
