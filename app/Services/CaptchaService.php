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
        // Characters excluding confusing ones like 0/O, 1/I/l
        $characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        $length = 5;
        $code = '';
        for ($i = 0; $i < $length; $i++) {
            $code .= $characters[random_int(0, strlen($characters) - 1)];
        }

        // Store lowercase in session with timestamp (valid for 15 minutes)
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
     * Render SVG with noise lines, dots, and randomized character angles.
     */
    private static function renderSvg(string $code): string
    {
        $width = 170;
        $height = 54;

        // Background color
        $bgColors = ['#0f172a', '#064e3b', '#1e293b', '#022c22'];
        $bg = $bgColors[array_rand($bgColors)];

        $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'.$width.'" height="'.$height.'" viewBox="0 0 '.$width.' '.$height.'" style="border-radius:12px;user-select:none;-webkit-user-select:none;">';
        $svg .= '<rect width="100%" height="100%" fill="'.$bg.'"/>';

        // Background decorative grid / dots
        for ($i = 0; $i < 15; $i++) {
            $cx = random_int(5, $width - 5);
            $cy = random_int(5, $height - 5);
            $r = random_int(1, 2);
            $svg .= '<circle cx="'.$cx.'" cy="'.$cy.'" r="'.$r.'" fill="#34d399" opacity="0.25"/>';
        }

        // Noise lines
        for ($i = 0; $i < 4; $i++) {
            $x1 = random_int(0, $width);
            $y1 = random_int(0, $height);
            $x2 = random_int(0, $width);
            $y2 = random_int(0, $height);
            $svg .= '<line x1="'.$x1.'" y1="'.$y1.'" x2="'.$x2.'" y2="'.$y2.'" stroke="#10b981" stroke-width="1.5" opacity="0.35"/>';
        }

        // Render characters with slight offset and rotation
        $charCount = strlen($code);
        $spacing = ($width - 30) / $charCount;
        $textColors = ['#ffffff', '#a7f3d0', '#6ee7b7', '#fef08a', '#e2e8f0'];

        for ($i = 0; $i < $charCount; $i++) {
            $char = $code[$i];
            $x = 20 + ($i * $spacing) + random_int(-3, 3);
            $y = 35 + random_int(-3, 3);
            $angle = random_int(-18, 18);
            $color = $textColors[$i % count($textColors)];
            $fontSize = random_int(22, 26);

            $svg .= '<text x="'.$x.'" y="'.$y.'" font-family="monospace, Courier, sans-serif" font-size="'.$fontSize.'" font-weight="900" fill="'.$color.'" transform="rotate('.$angle.' '.$x.','.$y.')" letter-spacing="2">'.$char.'</text>';
        }

        // Foreground wave line
        $ctrlX = random_int(40, $width - 40);
        $ctrlY = random_int(5, $height - 5);
        $svg .= '<path d="M 0 '.random_int(15, 35).' Q '.$ctrlX.' '.$ctrlY.' '.$width.' '.random_int(15, 35).'" stroke="#6ee7b7" stroke-width="1.2" fill="none" opacity="0.4"/>';

        $svg .= '</svg>';

        return $svg;
    }
}
