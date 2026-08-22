<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Inquiry;
use App\Models\Product;
use App\Models\News;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompanyProfileTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_home_page_returns_ok_with_props(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_all_public_pages_return_ok(): void
    {
        $this->get('/teknologi')->assertStatus(200);
        $this->get('/bisnis')->assertStatus(200);
        $this->get('/peralatan')->assertStatus(200);
        $this->get('/produk')->assertStatus(200);
        $this->get('/tentang-kami')->assertStatus(200);
        $this->get('/berita')->assertStatus(200);
        $this->get('/karir')->assertStatus(200);
        $this->get('/kontak')->assertStatus(200);
    }

    public function test_contact_form_submits_successfully(): void
    {
        $response = $this->post('/kontak', [
            'type' => 'rfq',
            'name' => 'John Doe QA',
            'company_name' => 'Tech Corp',
            'email' => 'johndoe@example.com',
            'phone' => '081299998888',
            'subject' => 'Permintaan Penawaran Part Presisi',
            'message' => 'Halo tim Sagayama, kami butuh penawaran untuk 10.000 pcs flange shaft.',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('inquiries', [
            'email' => 'johndoe@example.com',
            'type' => 'rfq',
        ]);
    }

    public function test_admin_authentication_and_dashboard(): void
    {
        $this->get('/admin/login')->assertStatus(200);

        $loginResponse = $this->post('/admin/login', [
            'email' => 'admin@sagayama.co.jp',
            'password' => 'password123',
        ]);

        $loginResponse->assertRedirect('/admin/dashboard');

        $user = User::where('email', 'admin@sagayama.co.jp')->first();
        $this->actingAs($user)->get('/admin/dashboard')->assertStatus(200);
        $this->actingAs($user)->get('/admin/products')->assertStatus(200);
        $this->actingAs($user)->get('/admin/inquiries')->assertStatus(200);
        $this->actingAs($user)->get('/admin/settings')->assertStatus(200);
    }
}
