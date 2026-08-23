<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $fillable = ['name', 'guard_name'];

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(
            Permission::class,
            'role_has_permissions',
            'role_id',
            'permission_id'
        );
    }

    public function users(): BelongsToMany
    {
        return $this->morphedByMany(
            User::class,
            'model',
            'model_has_roles',
            'role_id',
            'model_id'
        );
    }

    public function givePermissionTo(...$permissions): self
    {
        $permissions = collect($permissions)->flatten()->map(function ($perm) {
            return is_string($perm) ? Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']) : $perm;
        });

        $this->permissions()->syncWithoutDetaching($permissions->pluck('id'));
        return $this;
    }

    public function syncPermissions(...$permissions): self
    {
        $permissions = collect($permissions)->flatten()->map(function ($perm) {
            return is_string($perm) ? Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']) : $perm;
        });

        $this->permissions()->sync($permissions->pluck('id'));
        return $this;
    }
}
