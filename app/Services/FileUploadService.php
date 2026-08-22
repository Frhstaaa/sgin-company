<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload an image file to public storage
     */
    public function uploadImage(UploadedFile $file, string $folder = 'uploads'): string
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

        // Automatically convert to WebP if supported
        if (in_array($extension, $supportedExtensions) && function_exists('imagewebp')) {
            try {
                $imageContent = file_get_contents($file->getRealPath());
                $image = @imagecreatefromstring($imageContent);
                
                if ($image !== false) {
                    // Preserve transparency
                    imagepalettetotruecolor($image);
                    imagealphablending($image, false); // Fix for PNG transparency
                    imagesavealpha($image, true);
                    
                    // Convert to WEBP (quality 85) using temp file for better compatibility
                    $tempPath = tempnam(sys_get_temp_dir(), 'webp_');
                    if (imagewebp($image, $tempPath, 85)) {
                        $webpContent = file_get_contents($tempPath);
                        unlink($tempPath);
                        imagedestroy($image);
                        
                        if ($webpContent) {
                            $filename = Str::random(20) . '.webp';
                            $path = $folder . '/' . $filename;
                            Storage::disk('public')->put($path, $webpContent);
                            return '/storage/' . $path;
                        }
                    } else {
                        imagedestroy($image);
                        if (file_exists($tempPath)) {
                            unlink($tempPath);
                        }
                    }
                }
            } catch (\Exception $e) {
                // Ignore errors and fallback to original upload
            }
        }

        // Fallback for non-image or unsupported formats
        $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs($folder, $filename, 'public');
        return '/storage/' . $path;
    }

    /**
     * Delete an image from storage
     */
    public function deleteImage(?string $url): bool
    {
        if (!$url) return false;
        
        $path = str_replace('/storage/', '', $url);
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }
        return false;
    }
}
