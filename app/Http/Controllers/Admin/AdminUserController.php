<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Role;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        // Ensure default roles exist if table was not yet seeded
        if (Role::count() === 0) {
            foreach (['Super Admin', 'Admin', 'Editor'] as $rName) {
                Role::firstOrCreate(['name' => $rName, 'guard_name' => 'web']);
            }
        }

        $users = User::with('roles')->orderBy('id', 'asc')->get()->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'roles' => $u->getRoleNames(),
                'role' => $u->getRoleNames()->first() ?? 'Editor',
                'created_at' => $u->created_at?->format('d M Y, H:i'),
            ];
        });

        $roles = Role::all()->pluck('name');
        if ($roles->isEmpty()) {
            $roles = collect(['Super Admin', 'Admin', 'Editor']);
        }

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'string', 'min:6'],
            'role' => 'required|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Role::firstOrCreate(['name' => $validated['role'], 'guard_name' => 'web']);
        $user->assignRole($validated['role']);

        return back()->with('success', "Pengguna {$user->name} berhasil ditambahkan dengan peran {$validated['role']}.");
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'exclude_if:password,""', 'string', 'min:6'],
            'role' => 'nullable|string',
        ]);

        $userData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        if (!empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }

        $user->update($userData);

        if (!empty($validated['role'])) {
            Role::firstOrCreate(['name' => $validated['role'], 'guard_name' => 'web']);
            $user->syncRoles([$validated['role']]);
        }

        return back()->with('success', "Data pengguna {$user->name} berhasil diperbarui.");
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user() && $request->user()->id === $user->id) {
            return back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri yang sedang digunakan.');
        }

        // Prevent deleting the last Super Admin
        if ($user->hasRole('Super Admin')) {
            $superAdminCount = User::whereHas('roles', fn ($q) => $q->where('name', 'Super Admin'))->count();
            if ($superAdminCount <= 1) {
                return back()->with('error', 'Tidak dapat menghapus Super Admin terakhir pada sistem.');
            }
        }

        $userName = $user->name;
        $user->delete();

        return back()->with('success', "Pengguna {$userName} berhasil dihapus.");
    }
}
