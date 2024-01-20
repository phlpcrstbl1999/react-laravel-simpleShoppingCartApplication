<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['ordersList']);
    }

    public function ordersList()
    {
        $orders = Order::select('product_id', 'quantity', 'created_at')->get();
        return response()->json([
            $orders
    ], 200);
    }

    public function orders(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:1',
        ]);

        $product = Product::find($request->product_id);
        if ($request->quantity > $product->available_stock) {
            return response()->json([
                'message' => 'Failed to order this product due to unavailability of the stock'
            ], 400);
        }

        Order::create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'created_at' => now(),
        ]);
        return response()->json([
            'message' => 'You have successfully ordered this product.'
        ], 201);
    }


    public function show($id)
    {
        $order = Order::findOrFail($id, ['product_id', 'quantity']);
        return response()->json([
            $order
        ], 200);
    }

    public function edit($id)
    {
        $order = Order::findOrFail($id, ['product_id', 'quantity', 'created_at']);
        return response()->json([
            $order
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($request->product_id);
        if ($request->quantity > $product->available_stock) {
            return response()->json([
                'message' => 'Failed to order this product due to unavailability of the stock'
            ], 400);
        }
        $order = Order::findOrFail($id, ['product_id', 'quantity', 'created_at']);

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:1',
        ]);

        $order->update($request->all());

        return response()->json([
            $order
        ], 201);
    }

    public function delete($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json([
            'message' => 'Order successfully deleted'
        ], 204);
    }
}
