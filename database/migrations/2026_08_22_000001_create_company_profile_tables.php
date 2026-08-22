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
        // 1. Site Settings
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->longText('value')->nullable();
            $table->string('group')->default('general');
            $table->string('type')->default('text');
            $table->timestamps();
        });

        // 2. Hero Slides
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('title_jp')->nullable();
            $table->string('title_id');
            $table->text('subtitle')->nullable();
            $table->string('image_url');
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Company Stats
        Schema::create('company_stats', function (Blueprint $table) {
            $table->id();
            $table->string('title_jp')->nullable();
            $table->string('title_id');
            $table->string('value');
            $table->string('unit')->nullable();
            $table->string('subtext')->nullable();
            $table->string('icon')->default('award');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 4. Technologies
        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('step_number')->default('01');
            $table->string('title');
            $table->string('title_jp')->nullable();
            $table->text('short_description');
            $table->longText('content')->nullable();
            $table->json('features')->nullable();
            $table->string('image_url')->nullable();
            $table->string('icon')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 5. Business Units
        Schema::create('business_units', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('title_jp')->nullable();
            $table->text('description');
            $table->longText('content')->nullable();
            $table->string('image_url');
            $table->string('tag')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 6. Equipment & Machinery
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('name');
            $table->string('model_number')->nullable();
            $table->string('manufacturer')->nullable();
            $table->json('specs')->nullable();
            $table->integer('quantity')->default(1);
            $table->string('image_url')->nullable();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 7. Product Categories
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('name_jp')->nullable();
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 8. Products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('product_categories')->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('sku')->nullable();
            $table->string('name');
            $table->string('name_jp')->nullable();
            $table->string('material')->nullable();
            $table->string('application')->nullable();
            $table->string('tolerance')->nullable();
            $table->json('specs')->nullable();
            $table->string('image_url');
            $table->json('gallery')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 9. Company Profiles
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('company_name_jp')->nullable();
            $table->string('president_name')->nullable();
            $table->longText('president_message')->nullable();
            $table->string('president_photo_url')->nullable();
            $table->text('philosophy')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->json('history_timeline')->nullable();
            $table->json('certifications')->nullable();
            $table->json('branches')->nullable();
            $table->string('capital')->nullable();
            $table->string('established_date')->nullable();
            $table->string('employees_count')->nullable();
            $table->timestamps();
        });

        // 10. News & Announcements
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('category')->default('Pemberitahuan');
            $table->string('title');
            $table->text('excerpt');
            $table->longText('content');
            $table->string('cover_image')->nullable();
            $table->date('published_at');
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // 11. Careers
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('department');
            $table->string('employment_type')->default('Full-time');
            $table->string('location')->default('Kantor Pusat & Pabrik');
            $table->json('requirements')->nullable();
            $table->json('responsibilities')->nullable();
            $table->json('benefits')->nullable();
            $table->string('salary_range')->nullable();
            $table->date('deadline')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 12. Inquiries & Contact Messages
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('general'); // general, rfq, consultation
            $table->string('name');
            $table->string('company_name')->nullable();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->string('status')->default('unread'); // unread, read, contacted, closed
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('careers');
        Schema::dropIfExists('news');
        Schema::dropIfExists('company_profiles');
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('equipment');
        Schema::dropIfExists('business_units');
        Schema::dropIfExists('technologies');
        Schema::dropIfExists('company_stats');
        Schema::dropIfExists('hero_slides');
        Schema::dropIfExists('site_settings');
    }
};
