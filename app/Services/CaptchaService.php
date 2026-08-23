<?php

namespace App\Services;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class CaptchaService
{
    /**
     * Generate a new captcha challenge, store hash in session, and return SVG markup.
     */
    public static function generate(string $sessionKey = 'career_captcha'): array
    {
        // Characters excluding easily confused ones (0/O, 1/I/l)
        $characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        $length = 5;
        $code = '';
        for ($i = 0; $i < $length; $i++) {
            $code .= $characters[random_int(0, strlen($characters) - 1)];
        }

        // Store in session with timestamp (valid for 15 minutes)
        Session::put($sessionKey, [
            'code' => strtoupper($code),
            'expires_at' => now()->addMinutes(15)->timestamp,
        ]);

        $svg = self::renderSvg($code);

        return [
            'svg' => $svg,
            'key' => $sessionKey,
        ];
    }

    /**
     * Validate the provided code against session.
     */
    public static function validate(string $userInput, string $sessionKey = 'career_captcha'): bool
    {
        $stored = Session::get($sessionKey);
        if (!$stored || !is_array($stored)) {
            return false;
        }

        if (now()->timestamp > ($stored['expires_at'] ?? 0)) {
            Session::forget($sessionKey);
            return false;
        }

        $isValid = strtoupper(trim($userInput)) === strtoupper($stored['code'] ?? '');
        
        if ($isValid) {
            // Invalidate to prevent replay attacks
            Session::forget($sessionKey);
        }

        return $isValid;
    }

    /**
     * Render a sleek, professional Japanese High-Tech Precision Security Token SVG.
     */
    private static function renderSvg(string $code): string
    {
        $width = 160;
        $height = 48;

        $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'.$width.'" height="'.$height.'" viewBox="0 0 '.$width.' '.$height.'" style="display:block;border-radius:10px;user-select:none;-webkit-user-select:none;">';
        
        // Definitions for gradients & glow filters
        $svg .= '<defs>';
        $svg .= '<linearGradient id="tokenBg" x1="0%" y1="0%" x2="100%" y2="100%">';
        $svg .= '<stop offset="0%" stop-color="#091e17"/>';
        $svg .= '<stop offset="50%" stop-color="#042f24"/>';
        $svg .= '<stop offset="100%" stop-color="#021f18"/>';
        $svg .= '</linearGradient>';
        $svg .= '<pattern id="blueprintGrid" width="12" height="12" patternUnits="userSpaceOnUse">';
        $svg .= '<path d="M 12 0 L 0 0 0 12" fill="none" stroke="#10b981" stroke-width="0.5" stroke-opacity="0.15"/>';
        $svg .= '</pattern>';
        $svg .= '</defs>';

        // Background
        $svg .= '<rect width="100%" height="100%" fill="url(#tokenBg)" rx="10"/>';
        $svg .= '<rect width="100%" height="100%" fill="url(#blueprintGrid)" rx="10"/>';

        // Precision Tick Marks (Top & Bottom edge measurement ticks)
        for ($x = 10; $x < $width; $x += 15) {
            $svg .= '<line x1="'.$x.'" y1="0" x2="'.$x.'" y2="3" stroke="#34d399" stroke-width="0.8" opacity="0.3"/>';
            $svg .= '<line x1="'.$x.'" y1="'.($height - 3).'" x2="'.$x.'" y2="'.$height.'" stroke="#34d399" stroke-width="0.8" opacity="0.3"/>';
        }

        // Geometric security arcs / curve
        $svg .= '<path d="M 0 24 Q 40 8, 80 24 T 160 24" fill="none" stroke="#059669" stroke-width="1.2" opacity="0.3"/>';
        $svg .= '<path d="M 0 32 Q 50 44, 100 28 T 160 16" fill="none" stroke="#34d399" stroke-width="0.8" opacity="0.25"/>';

        // Characters with distinct modern font & vibrant color palette
        $charCount = strlen($code);
        $spacing = ($width - 24) / $charCount;
        $palette = ['#ffffff', '#6ee7b7', '#fef08a', '#93c5fd', '#a7f3d0'];

        for ($i = 0; $i < $charCount; $i++) {
            $char = $code[$i];
            $x = 16 + ($i * $spacing) + random_int(-2, 2);
            $y = 31 + random_int(-2, 2);
            $angle = random_int(-12, 12);
            $color = $palette[$i % count($palette)];

            $svg .= '<text x="'.$x.'" y="'.$y.'" font-family="-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif" font-size="21" font-weight="900" fill="'.$color.'" transform="rotate('.$angle.' '.$x.','.$y.')" style="letter-spacing:1px;text-shadow:0 1px 2px rgba(0,0,0,0.5);">'.$char.'</text>';
        }

        // Precision Corner Badge / Border
        $svg .= '<rect x="0.5" y="0.5" width="'.($width - 1).'" height="'.($height - 1).'" rx="9.5" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>';

        $svg .= '</svg>';

        return $svg;
    }
}
