<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Services\NewsService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminNewsController extends Controller
{
    public function __construct(
        protected NewsService $newsService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['category', 'search']);
        $news = $this->newsService->getAll($filters, 15);

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
            'filters' => $filters,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|max:5120',
            'cover_image_url' => 'nullable|string',
            'published_at' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $coverImage = $request->file('cover_image');
        unset($validated['cover_image']);
        if (!empty($validated['cover_image_url'])) {
            $validated['cover_image'] = $validated['cover_image_url'];
        }

        $this->newsService->create($validated, $coverImage);
        return back()->with('success', 'Berita berhasil diterbitkan.');
    }

    public function update(Request $request, News $news): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|max:5120',
            'cover_image_url' => 'nullable|string',
            'published_at' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $coverImage = $request->file('cover_image');
        unset($validated['cover_image']);
        if (!empty($validated['cover_image_url'])) {
            $validated['cover_image'] = $validated['cover_image_url'];
        }

        $this->newsService->update($news->id, $validated, $coverImage);
        return back()->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(News $news): RedirectResponse
    {
        $this->newsService->delete($news->id);
        return back()->with('success', 'Berita berhasil dihapus.');
    }
}
