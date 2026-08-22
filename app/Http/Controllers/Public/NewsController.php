<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\NewsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function __construct(
        protected NewsService $newsService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['category', 'search']);
        $filters['published_only'] = true;
        $news = $this->newsService->getAll($filters, 9);

        return Inertia::render('News/Index', [
            'news' => $news,
            'filters' => $filters,
        ]);
    }

    public function show(string $slug): Response
    {
        $article = $this->newsService->findBySlug($slug);
        $latestNews = $this->newsService->getLatest(4);

        return Inertia::render('News/Show', [
            'article' => $article,
            'news' => $article,
            'latestNews' => $latestNews,
        ]);
    }
}
