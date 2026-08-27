<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthController extends Controller
{
    /**
     * Display the stealth admin login page.
     */
    public function showLogin(Request $request): Response|RedirectResponse
    {
        if (Auth::check()) {
            return redirect()->route('admin.dashboard');
        }
        return Inertia::render('Admin/Auth/Login', [
            'csrf_token' => csrf_token(),
        ]);
    }

    /**
     * Handle an incoming authentication request with brute-force rate limiting.
     */
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email:rfc,filter|max:255',
            'password' => 'required|string',
        ]);

        // Security: Rate limiting key based on IP + Email
        $throttleKey = Str::transliterate(Str::lower($credentials['email']) . '|' . $request->ip());

        // Limit to 5 attempts per 60 seconds
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            Log::warning('Admin login rate limit exceeded', [
                'email' => $credentials['email'],
                'ip' => $request->ip(),
                'lockout_seconds' => $seconds,
            ]);

            return back()->withErrors([
                'email' => "Terlalu banyak percobaan login yang gagal. Demi keamanan sistem, akses diblokir sementara. Silakan tunggu {$seconds} detik sebelum mencoba kembali.",
            ]);
        }

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            // Clear brute force counter on successful authentication
            RateLimiter::clear($throttleKey);
            
            $request->session()->regenerate();

            Log::info('Admin user logged in successfully', [
                'user_id' => Auth::id(),
                'email' => Auth::user()->email,
                'ip' => $request->ip(),
            ]);

            return redirect()->intended(route('admin.dashboard'));
        }

        // Record failed attempt (expires in 60 seconds)
        RateLimiter::hit($throttleKey, 60);

        Log::warning('Failed admin login attempt', [
            'email' => $credentials['email'],
            'ip' => $request->ip(),
        ]);

        return back()->withErrors([
            'email' => 'Email atau password yang Anda masukkan salah.',
        ]);
    }

    /**
     * Log the user out of the application and stealthily redirect to home.
     */
    public function logout(Request $request): RedirectResponse
    {
        $user = Auth::user();
        if ($user) {
            Log::info('Admin user logged out', [
                'user_id' => $user->id,
                'email' => $user->email,
                'ip' => $request->ip(),
            ]);
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to public home so the secret admin path is not left in history
        return redirect('/');
    }
}
