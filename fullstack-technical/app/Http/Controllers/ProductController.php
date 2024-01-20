<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function products()
    {
        $products = Product::select('id', 'name', 'available_stock')->get();
        return response()->json([
            $products
        ], 200);
    }

}
