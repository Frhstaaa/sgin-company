<?php

namespace App\Repositories\Eloquent;

use App\Models\SiteSetting;
use App\Repositories\Contracts\SettingRepositoryInterface;

class EloquentSettingRepository implements SettingRepositoryInterface
{
    public function getAll()
    {
        return SiteSetting::all()->pluck('value', 'key')->toArray();
    }

    public function getGroup(string $group)
    {
        return SiteSetting::where('group', $group)->get();
    }

    public function get(string $key, $default = null)
    {
        return SiteSetting::getByKey($key, $default);
    }

    public function set(string $key, $value, string $group = 'general', string $type = 'text')
    {
        return SiteSetting::setByKey($key, $value, $group, $type);
    }

    public function setMultiple(array $settings, string $group = 'general')
    {
        foreach ($settings as $key => $value) {
            $this->set($key, $value, $group);
        }
        return true;
    }
}
