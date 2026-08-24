<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreventStaleCache
{
    /**
     * Handle an incoming request.
     * Attach strict anti-caching headers to all dynamic web pages and Inertia requests
     * so that client browsers always receive the latest content without manual cache clearing.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Apply no-cache only to dynamic responses (HTML, Inertia JSON, redirections)
        // Static assets (like /build/assets/*) are handled directly by web server (.htaccess)
        if ($response instanceof Response && !$request->is('build/*', 'images/*', 'favicon.ico')) {
            $response->headers->set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0, private');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
        }

        return $response;
    }
}
