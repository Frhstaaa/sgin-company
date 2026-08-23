<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Career;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminJobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['status', 'career_id', 'search']);
        
        $query = JobApplication::with('career')->latest();

        if (!empty($filters['status']) && $filters['status'] !== 'all') {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['career_id'])) {
            $query->where('career_id', $filters['career_id']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('position_title', 'like', "%{$search}%");
            });
        }

        $applications = $query->paginate(15)->withQueryString();

        $careers = Career::orderBy('title')->get(['id', 'title']);

        $counts = [
            'all' => JobApplication::count(),
            'new' => JobApplication::where('status', 'new')->count(),
            'reviewed' => JobApplication::where('status', 'reviewed')->count(),
            'interview' => JobApplication::where('status', 'interview')->count(),
            'accepted' => JobApplication::where('status', 'accepted')->count(),
            'rejected' => JobApplication::where('status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/JobApplications/Index', [
            'applications' => $applications,
            'filters' => $filters,
            'careers' => $careers,
            'counts' => $counts,
        ]);
    }

    public function updateStatus(Request $request, JobApplication $application)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,reviewed,interview,accepted,rejected',
            'admin_notes' => 'nullable|string|max:2000',
        ]);

        $application->update($validated);

        return redirect()->back()->with('success', 'Status pelamar berhasil diperbarui.');
    }

    public function destroy(JobApplication $application)
    {
        if ($application->cv_path && Storage::disk('public')->exists($application->cv_path)) {
            Storage::disk('public')->delete($application->cv_path);
        }

        $application->delete();

        return redirect()->back()->with('success', 'Data lamaran kerja berhasil dihapus.');
    }
}
