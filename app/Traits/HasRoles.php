<?php

namespace App\Traits;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasRoles
{
    public function scopeRole($query, $role)
    {
        return $query->whereHas('roles', function ($q) use ($role) {
            if (is_array($role)) {
                $q->whereIn('name', $role);
            } else {
                $q->where('name', $role);
            }
        });
    }

    public function roles(): MorphToMany
    {
        return $this->morphToMany(
            Role::class,
            'model',
            'model_has_roles',
            'model_id',
            'role_id'
        );
    }

    public function assignRole(...$roles): self
    {
        $roleModels = collect($roles)->flatten()->map(function ($role) {
            return is_string($role) ? Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']) : $role;
        });

        $this->roles()->syncWithoutDetaching($roleModels->pluck('id'));
        return $this;
    }

    public function syncRoles(...$roles): self
    {
        $roleModels = collect($roles)->flatten()->map(function ($role) {
            return is_string($role) ? Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']) : $role;
        });

        $this->roles()->sync($roleModels->pluck('id'));
        return $this;
    }

    public function removeRole($role): self
    {
        $roleModel = is_string($role) ? Role::where('name', $role)->first() : $role;
        if ($roleModel) {
            $this->roles()->detach($roleModel->id);
        }
        return $this;
    }

    public function hasRole($roles): bool
    {
        if (is_string($roles)) {
            return $this->roles->contains('name', $roles);
        }

        if (is_array($roles)) {
            foreach ($roles as $role) {
                if ($this->hasRole($role)) {
                    return true;
                }
            }
            return false;
        }

        return (bool) $roles->intersect($this->roles)->count();
    }

    public function hasPermissionTo($permission): bool
    {
        // Super Admin has all permissions
        if ($this->hasRole('Super Admin')) {
            return true;
        }

        $permName = is_string($permission) ? $permission : $permission->name;

        return $this->roles->loadMissing('permissions')
            ->pluck('permissions')
            ->flatten()
            ->contains('name', $permName);
    }

    public function getAllPermissions()
    {
        return $this->roles->loadMissing('permissions')
            ->pluck('permissions')
            ->flatten()
            ->unique('id');
    }

    public function getRoleNames()
    {
        return $this->roles->pluck('name');
    }

    public function getPermissionNames()
    {
        return $this->getAllPermissions()->pluck('name');
    }
}
