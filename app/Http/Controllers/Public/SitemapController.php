<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use App\Models\Technology;
use App\Models\BusinessUnit;
use App\Models\Product;
use App\Models\News;
use App\Models\Career;

class SitemapController extends Controller
{
    /**
     * Generate dynamic XML Sitemap for Google & search engines
     */
    public function index(): Response
    {
        $baseUrl = rtrim(url('/'), '/');

        // Static routes with priorities and changefreq
        $routes = [
            ['loc' => $baseUrl . '/', 'priority' => '1.0', 'changefreq' => 'daily', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/technology', 'priority' => '0.9', 'changefreq' => 'weekly', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/business', 'priority' => '0.9', 'changefreq' => 'weekly', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/equipment', 'priority' => '0.8', 'changefreq' => 'monthly', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/production-process', 'priority' => '0.9', 'changefreq' => 'weekly', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/products', 'priority' => '0.9', 'changefreq' => 'weekly', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/about-us', 'priority' => '0.9', 'changefreq' => 'weekly', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/news', 'priority' => '0.8', 'changefreq' => 'daily', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/careers', 'priority' => '0.8', 'changefreq' => 'weekly', 'lastmod' => now()->toDateString()],
            ['loc' => $baseUrl . '/contact', 'priority' => '0.8', 'changefreq' => 'monthly', 'lastmod' => now()->toDateString()],
        ];

        // Dynamic Technology routes
        try {
            $technologies = Technology::all();
            foreach ($technologies as $tech) {
                $routes[] = [
                    'loc' => $baseUrl . '/technology/' . $tech->slug,
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                    'lastmod' => $tech->updated_at ? $tech->updated_at->toDateString() : now()->toDateString()
                ];
            }
        } catch (\Throwable $e) {}

        // Dynamic Business routes
        try {
            $businesses = BusinessUnit::all();
            foreach ($businesses as $biz) {
                $routes[] = [
                    'loc' => $baseUrl . '/business/' . $biz->slug,
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                    'lastmod' => $biz->updated_at ? $biz->updated_at->toDateString() : now()->toDateString()
                ];
            }
        } catch (\Throwable $e) {}

        // Dynamic Product routes
        try {
            $products = Product::where('is_active', true)->get();
            foreach ($products as $prod) {
                $routes[] = [
                    'loc' => $baseUrl . '/products/' . $prod->slug,
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                    'lastmod' => $prod->updated_at ? $prod->updated_at->toDateString() : now()->toDateString()
                ];
            }
        } catch (\Throwable $e) {}

        // Dynamic News routes
        try {
            $newsList = News::where('is_published', true)->get();
            foreach ($newsList as $item) {
                $routes[] = [
                    'loc' => $baseUrl . '/news/' . $item->slug,
                    'priority' => '0.7',
                    'changefreq' => 'weekly',
                    'lastmod' => $item->updated_at ? $item->updated_at->toDateString() : now()->toDateString()
                ];
            }
        } catch (\Throwable $e) {}

        // Dynamic Career routes
        try {
            $careers = Career::where('is_active', true)->get();
            foreach ($careers as $car) {
                $routes[] = [
                    'loc' => $baseUrl . '/careers/' . $car->slug,
                    'priority' => '0.7',
                    'changefreq' => 'weekly',
                    'lastmod' => $car->updated_at ? $car->updated_at->toDateString() : now()->toDateString()
                ];
            }
        } catch (\Throwable $e) {}

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($routes as $r) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($r['loc']) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $r['lastmod'] . '</lastmod>' . "\n";
            $xml .= '    <changefreq>' . $r['changefreq'] . '</changefreq>' . "\n";
            $xml .= '    <priority>' . $r['priority'] . '</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'text/xml; charset=UTF-8',
        ]);
    }
}
