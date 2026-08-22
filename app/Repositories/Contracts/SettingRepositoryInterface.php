<?php

namespace App\Repositories\Contracts;

interface SettingRepositoryInterface
{
    public function getAll();
    public function getGroup(string $group);
    public function get(string $key, $default = null);
    public function set(string $key, $value, string $group = 'general', string $type = 'text');
    public function setMultiple(array $settings, string $group = 'general');
}
