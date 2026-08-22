<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\EquipmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EquipmentController extends Controller
{
    public function __construct(
        protected EquipmentService $equipmentService
    ) {}

    public function index(Request $request): Response
    {
        $category = $request->query('category');
        $equipments = $category 
            ? $this->equipmentService->getByCategory($category) 
            : $this->equipmentService->getAll();
        
        $categories = $this->equipmentService->getCategories();

        return Inertia::render('Equipment/Index', [
            'equipments' => $equipments,
            'categories' => $categories,
            'selectedCategory' => $category,
        ]);
    }
}
