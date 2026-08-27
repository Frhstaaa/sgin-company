<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Trust all reverse proxies (Cloudflare, Nginx, cPanel SSL termination) for HTTPS & CSRF
        $middleware->trustProxies(at: '*');

        // Stealth Security: Return 404 for unauthenticated access to admin routes to prevent leaking the secret path
        $middleware->redirectGuestsTo(function ($request) {
            abort(404);
        });

        $middleware->web(append: [
            \App\Http\Middleware\SecurityHeaders::class,
            \App\Http\Middleware\SetLocale::class,
            \App\Http\Middleware\PreventStaleCache::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Seamless 419 Recovery: When session or CSRF token expires, auto-redirect back with fresh token instead of throwing 419 error page
        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response, \Throwable $e, \Illuminate\Http\Request $request) {
            if ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'Sesi telah diperbarui otomatis. Silakan coba masuk kembali.',
                ]);
            }
            return $response;
        });
    })->create();
