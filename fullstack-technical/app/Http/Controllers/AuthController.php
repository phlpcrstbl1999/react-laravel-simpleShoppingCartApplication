<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {

        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser) {
            return response()->json([
                'message' => 'Email already taken',
                ], 400);
            }
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users,email',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User successfully registered', 
        ], 201);
    } catch (ValidationException $e) {
        return response()->json([
            'message' => 'Registration failed',
            'errors' => $e->validator->errors(),
        ], 400);
    } 
    }
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token], 201);
    }
}
