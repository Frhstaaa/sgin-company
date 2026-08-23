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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->nullable()->constrained('careers')->nullOnDelete();
            $table->string('position_title');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->nullable(); // 'Laki-laki', 'Perempuan'
            $table->string('last_education')->nullable(); // 'SMK/SMA', 'D3', 'D4/S1', 'S2', 'Lainnya'
            $table->string('major')->nullable();
            $table->string('years_of_experience')->nullable();
            $table->string('current_company')->nullable();
            $table->string('expected_salary')->nullable();
            $table->string('cv_path');
            $table->string('portfolio_url')->nullable();
            $table->text('cover_letter')->nullable();
            $table->string('status')->default('new'); // 'new', 'reviewed', 'interview', 'accepted', 'rejected'
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
