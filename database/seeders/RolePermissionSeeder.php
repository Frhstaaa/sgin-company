<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Permissions
        $permissions = [
            'manage-users',
            'manage-settings',
            'manage-banners',
            'manage-company-profile',
            'manage-production-processes',
            'manage-products',
            'manage-equipment',
            'manage-technologies',
            'manage-business-units',
            'manage-news',
            'manage-careers',
            'manage-inquiries',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // 2. Create Roles
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $editorRole = Role::firstOrCreate(['name' => 'Editor', 'guard_name' => 'web']);

        // Give Super Admin all permissions
        $superAdminRole->syncPermissions(Permission::all());

        // Give Admin content & inquiry permissions (all except manage-users & manage-settings)
        $adminRole->syncPermissions([
            'manage-banners',
            'manage-company-profile',
            'manage-production-processes',
            'manage-products',
            'manage-equipment',
            'manage-technologies',
            'manage-business-units',
            'manage-news',
            'manage-careers',
            'manage-inquiries',
        ]);

        // Give Editor daily content permissions
        $editorRole->syncPermissions([
            'manage-news',
            'manage-careers',
            'manage-products',
        ]);

        // 3. Assign Super Admin to existing admin users
        $allUsers = User::all();
        foreach ($allUsers as $user) {
            if ($user->roles()->count() === 0) {
                $user->assignRole($superAdminRole);
            }
        }
    }
}
