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
            'message' => 'Halo tim PT. Sugiyama Indonesia, kami butuh penawaran untuk 10.000 pcs flange shaft.',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('inquiries', [
            'email' => 'johndoe@example.com',
            'type' => 'rfq',
        ]);
    }

    public function test_admin_authentication_and_dashboard(): void
    {
        // Public probing to legacy admin/login should return 404
        $this->get('/admin/login')->assertStatus(404);

        // Private /sginco-manage route should return 200
        $this->get('/sginco-manage')->assertStatus(200);

        $loginResponse = $this->post('/sginco-manage', [
            'email' => 'admin@sugiyama.co.id',
            'password' => 'password123',
        ]);

        $loginResponse->assertRedirect('/admin/dashboard');

        $user = User::where('email', 'admin@sugiyama.co.id')->first();
        $this->actingAs($user)->get('/admin/dashboard')->assertStatus(200);
        $this->actingAs($user)->get('/admin/products')->assertStatus(200);
        $this->actingAs($user)->get('/admin/inquiries')->assertStatus(200);
        $this->actingAs($user)->get('/admin/settings')->assertStatus(200);
    }

    public function test_admin_user_management_crud(): void
    {
        $admin = User::where('email', 'admin@sugiyama.co.id')->first();

        // 1. View Users List
        $response = $this->actingAs($admin)->get('/admin/users');
        $response->assertStatus(200);

        // 2. Create User
        $createResponse = $this->actingAs($admin)->post('/admin/users', [
            'name' => 'Editor Staff',
            'email' => 'editor@sugiyama.co.id',
            'password' => 'secret123',
            'role' => 'Editor',
        ]);
        $createResponse->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'editor@sugiyama.co.id']);

        $newUser = User::where('email', 'editor@sugiyama.co.id')->first();

        // 3. Update User (without changing password)
        $updateResponse = $this->actingAs($admin)->put("/admin/users/{$newUser->id}", [
            'name' => 'Editor Staff Updated',
            'email' => 'editor@sugiyama.co.id',
            'password' => '',
            'role' => 'Admin',
        ]);
        $updateResponse->assertRedirect();
        $this->assertDatabaseHas('users', ['name' => 'Editor Staff Updated']);

        // 4. Delete User
        $deleteResponse = $this->actingAs($admin)->delete("/admin/users/{$newUser->id}");
        $deleteResponse->assertRedirect();
        $this->assertDatabaseMissing('users', ['email' => 'editor@sugiyama.co.id']);
    }
}
