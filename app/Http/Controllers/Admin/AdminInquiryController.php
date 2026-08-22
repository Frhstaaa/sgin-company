<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Services\InquiryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminInquiryController extends Controller
{
    public function __construct(
        protected InquiryService $inquiryService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['status', 'type', 'search']);
        $inquiries = $this->inquiryService->getAll($filters, 15);
        $unreadCount = $this->inquiryService->getUnreadCount();

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries,
            'filters' => $filters,
            'unreadCount' => $unreadCount,
        ]);
    }

    public function show(Inquiry $inquiry): Response
    {
        if ($inquiry->status === 'unread') {
            $inquiry->update(['status' => 'read']);
        }

        $inquiry->load('product');

        return Inertia::render('Admin/Inquiries/Show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function updateStatus(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:unread,read,contacted,closed',
            'admin_notes' => 'nullable|string',
        ]);

        $this->inquiryService->updateStatus($inquiry->id, $validated['status'], $validated['admin_notes'] ?? null);
        return back()->with('success', 'Status pesan / RFQ berhasil diperbarui.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $this->inquiryService->delete($inquiry->id);
        return back()->with('success', 'Pesan / RFQ berhasil dihapus.');
    }
}
