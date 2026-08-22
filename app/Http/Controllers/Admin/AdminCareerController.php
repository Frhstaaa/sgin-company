<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Career;
use App\Services\CareerService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCareerController extends Controller
{
    public function __construct(
        protected CareerService $careerService
    ) {}

    public function index(): Response
    {
        $careers = $this->careerService->getAll(false);
        return Inertia::render('Admin/Careers/Index', [
            'careers' => $careers,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'employment_type' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'requirements' => 'nullable|array',
            'responsibilities' => 'nullable|array',
            'benefits' => 'nullable|array',
            'salary_range' => 'nullable|string|max:100',
            'deadline' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $this->careerService->create($validated);
        return back()->with('success', 'Lowongan karir berhasil ditambahkan.');
    }

    public function update(Request $request, Career $career): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'employment_type' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'requirements' => 'nullable|array',
            'responsibilities' => 'nullable|array',
            'benefits' => 'nullable|array',
            'salary_range' => 'nullable|string|max:100',
            'deadline' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $this->careerService->update($career->id, $validated);
        return back()->with('success', 'Lowongan karir berhasil diperbarui.');
    }

    public function destroy(Career $career): RedirectResponse
    {
        $this->careerService->delete($career->id);
        return back()->with('success', 'Lowongan karir berhasil dihapus.');
    }
}
