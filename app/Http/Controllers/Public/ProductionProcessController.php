<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ProductionProcess;
use Inertia\Inertia;
use Inertia\Response;

class ProductionProcessController extends Controller
{
    public function index(): Response
    {
        $processes = ProductionProcess::active()
            ->ordered()
            ->get();

        $mainFlow = $processes->where('category', 'main_flow')->values();
        $qcFlow = $processes->where('category', 'qc')->values();

        return Inertia::render('ProductionProcess/Index', [
            'processes' => $processes,
            'mainFlow' => $mainFlow,
            'qcFlow' => $qcFlow,
        ]);
    }
}
