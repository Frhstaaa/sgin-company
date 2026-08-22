<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyStat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminStatController extends Controller
{
    public function index(): Response
    {
        $stats = CompanyStat::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/Stats/Index', [
            'stats' => $stats,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_jp' => 'nullable|string|max:255',
            'title_id' => 'required|string|max:255',
            'value' => 'required|string|max:100',
            'unit' => 'nullable|string|max:50',
            'subtext' => 'nullable|string|max:255',
            'icon' => 'required|string|max:50',
            'order' => 'integer',
        ]);

        CompanyStat::create($validated);
        return back()->with('success', 'Statistik perusahaan berhasil ditambahkan.');
    }

    public function update(Request $request, CompanyStat $stat): RedirectResponse
    {
        $validated = $request->validate([
            'title_jp' => 'nullable|string|max:255',
            'title_id' => 'required|string|max:255',
            'value' => 'required|string|max:100',
            'unit' => 'nullable|string|max:50',
            'subtext' => 'nullable|string|max:255',
            'icon' => 'required|string|max:50',
            'order' => 'integer',
        ]);

        $stat->update($validated);
        return back()->with('success', 'Statistik perusahaan berhasil diperbarui.');
    }

    public function destroy(CompanyStat $stat): RedirectResponse
    {
        $stat->delete();
        return back()->with('success', 'Statistik perusahaan berhasil dihapus.');
    }
}
