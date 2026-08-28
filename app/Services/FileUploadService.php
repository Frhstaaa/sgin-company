<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload an image file to public storage with automatic folder creation,
     * dual storage mirroring (for cPanel compatibility), permission handling (0775),
     * and WebP conversion.
     */
    public function uploadImage(UploadedFile $file, string $folder = 'uploads'): string
    {
        $cleanFolder = trim($folder, '/');

        // 1. Direktori Target Primer (storage/app/public/...)
        $primaryDir = storage_path('app/public/' . $cleanFolder);
        if (!is_dir($primaryDir)) {
            @mkdir($primaryDir, 0775, true);
            @chmod($primaryDir, 0775);
        }

        // 2. Direktori Publik Sekunder (public/storage/...) jika public/storage bukan symlink
        $publicDir = public_path('storage/' . $cleanFolder);
        if (!is_dir($publicDir) && !is_link(public_path('storage'))) {
            @mkdir($publicDir, 0775, true);
            @chmod($publicDir, 0775);
        }

        $extension = strtolower($file->getClientOriginalExtension());
        $supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

        // 3. Coba konversi ke WebP untuk efisiensi jika GD mendukung
        if (in_array($extension, $supportedExtensions) && function_exists('imagewebp') && function_exists('imagecreatefromstring')) {
            try {
                $imageContent = @file_get_contents($file->getRealPath());
                if ($imageContent) {
                    $image = @imagecreatefromstring($imageContent);
                    if ($image !== false) {
                        imagepalettetotruecolor($image);
                        imagealphablending($image, false);
                        imagesavealpha($image, true);

                        $filename = Str::random(24) . '.webp';
                        $primaryPath = $primaryDir . '/' . $filename;
                        $publicPath = $publicDir . '/' . $filename;

                        if (@imagewebp($image, $primaryPath, 85)) {
                            @chmod($primaryPath, 0775);
                            // Salin juga ke public/storage jika folder fisik terpisah
                            if (is_dir($publicDir) && !file_exists($publicPath)) {
                                @copy($primaryPath, $publicPath);
                                @chmod($publicPath, 0775);
                            }
                            imagedestroy($image);
                            return '/storage/' . $cleanFolder . '/' . $filename;
                        }
                        imagedestroy($image);
                    }
                }
            } catch (\Throwable $e) {
                Log::warning('WebP conversion fallback triggered: ' . $e->getMessage());
            }
        }

        // 4. Fallback Handal: Simpan file asli langsung ke disk storage
        $safeExt = $extension ?: 'jpg';
        $filename = Str::random(24) . '.' . $safeExt;
        $primaryPath = $primaryDir . '/' . $filename;
        $publicPath = $publicDir . '/' . $filename;

        try {
            $file->move($primaryDir, $filename);
            @chmod($primaryPath, 0775);

            if (is_dir($publicDir) && !file_exists($publicPath)) {
                @copy($primaryPath, $publicPath);
                @chmod($publicPath, 0775);
            }

            return '/storage/' . $cleanFolder . '/' . $filename;
        } catch (\Throwable $e) {
            Log::error('Direct file move failed, attempting Storage put: ' . $e->getMessage());
            $relPath = $cleanFolder . '/' . $filename;
            Storage::disk('public')->put($relPath, file_get_contents($file->getRealPath()));
            return '/storage/' . $relPath;
        }
    }

    /**
     * Delete an image safely from storage
     */
    public function deleteImage(?string $url): bool
    {
        if (!$url || str_starts_with($url, '/images/')) {
            return false;
        }

        $relPath = ltrim(str_replace('/storage/', '', $url), '/');
        $primaryPath = storage_path('app/public/' . $relPath);
        $publicPath = public_path('storage/' . $relPath);

        $deleted = false;
        if (file_exists($primaryPath)) {
            @unlink($primaryPath);
            $deleted = true;
        }
        if (file_exists($publicPath) && !is_link(public_path('storage'))) {
            @unlink($publicPath);
            $deleted = true;
        }

        return $deleted;
    }
}
