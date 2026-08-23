<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = [];
        try {
            $settings = SiteSetting::all()->pluck('value', 'key')->toArray();
        } catch (\Exception $e) {
            // DB not ready or during initial install
        }

        $currentLocale = app()->getLocale();
        $translations = [];
        $langFile = base_path("lang/{$currentLocale}.json");
        if (file_exists($langFile)) {
            $translations = json_decode(file_get_contents($langFile), true) ?: [];
        }

        return [
            ...parent::share($request),
            'locale' => $currentLocale,
            'translations' => $translations,
            'availableLocales' => ['id', 'ja', 'en'],
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'roles' => $request->user()->getRoleNames(),
                    'permissions' => $request->user()->getAllPermissions()->pluck('name'),
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'message' => fn () => $request->session()->get('message'),
            ],
            'siteSettings' => $settings,
        ];
    }
}
