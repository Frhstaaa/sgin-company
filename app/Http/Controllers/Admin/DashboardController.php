<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\News;
use App\Models\Equipment;
use App\Models\Inquiry;
use App\Models\Career;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'totalInquiries' => Inquiry::count(),
            'unreadInquiries' => Inquiry::unread()->count(),
            'totalProducts' => Product::count(),
            'totalNews' => News::count(),
            'totalEquipment' => Equipment::count(),
            'activeCareers' => Career::active()->count(),
        ];

        $recentInquiries = Inquiry::with('product')
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get();

        $recentNews = News::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentInquiries' => $recentInquiries,
            'recentNews' => $recentNews,
        ]);
    }
}
