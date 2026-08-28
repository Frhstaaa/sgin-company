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
     * permission handling (0775), and WebP conversion.
     */
    public function uploadImage(UploadedFile $file, string $folder = 'uploads'): string
    {
        // 1. Pastikan folder fisik di server selalu ada dengan izin tulis
        $targetDir = storage_path('app/public/' . trim($folder, '/'));
        if (!is_dir($targetDir)) {
            @mkdir($targetDir, 0775, true);
            @chmod($targetDir, 0775);
        }

        $extension = strtolower($file->getClientOriginalExtension());
        $supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

        // 2. Coba konversi ke WebP untuk efisiensi jika GD mendukung imagewebp
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
                        $destPath = $targetDir . '/' . $filename;

                        if (@imagewebp($image, $destPath, 85)) {
                            @chmod($destPath, 0775);
                            imagedestroy($image);
                            return '/storage/' . trim($folder, '/') . '/' . $filename;
                        }
                        imagedestroy($image);
                    }
                }
            } catch (\Throwable $e) {
                Log::warning('WebP conversion fallback triggered: ' . $e->getMessage());
            }
        }

        // 3. Fallback Handal: Simpan file asli langsung ke disk storage
        $safeExt = $extension ?: 'jpg';
        $filename = Str::random(24) . '.' . $safeExt;
        $destPath = $targetDir . '/' . $filename;

        // Pindahkan file langsung
        try {
            $file->move($targetDir, $filename);
            @chmod($destPath, 0775);
            return '/storage/' . trim($folder, '/') . '/' . $filename;
        } catch (\Throwable $e) {
            Log::error('Direct file move failed, attempting Storage put: ' . $e->getMessage());
            $relPath = trim($folder, '/') . '/' . $filename;
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
        $fullPath = storage_path('app/public/' . $relPath);

        if (file_exists($fullPath)) {
            @unlink($fullPath);
            return true;
        }

        return false;
    }
}
