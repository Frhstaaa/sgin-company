<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request and attach enterprise-grade HTTP security headers.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request);

        // Clickjacking Defense
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // MIME-Sniffing Defense
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Legacy XSS Filter
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Privacy & Referrer Protection
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Restrict Dangerous Browser Features (Hardware API access)
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

        // HSTS (HTTP Strict Transport Security) for HTTPS
        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        return $response;
    }
}
