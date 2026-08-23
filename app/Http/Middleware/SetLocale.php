<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Supported locales in PT. Sugiyama Indonesia application.
     */
    protected array $supportedLocales = ['id', 'ja', 'en'];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Priority 1: Query parameter ?lang=
        $locale = $request->query('lang');

        // 2. Priority 2: Session locale
        if (!$locale || !in_array($locale, $this->supportedLocales)) {
            $locale = $request->session()->get('locale');
        }

        // 3. Priority 3: Cookie app_locale
        if (!$locale || !in_array($locale, $this->supportedLocales)) {
            $locale = $request->cookie('app_locale');
        }

        // 4. Priority 4: Default config locale ('id')
        if (!$locale || !in_array($locale, $this->supportedLocales)) {
            $locale = config('app.locale', 'id');
        }

        // Apply locale globally to Laravel Application
        App::setLocale($locale);
        $request->session()->put('locale', $locale);

        $response = $next($request);

        // Ensure cookie is attached if response is standard Response
        if (method_exists($response, 'cookie')) {
            $response->cookie('app_locale', $locale, 60 * 24 * 365); // 1 year expiry
        }

        return $response;
    }
}
