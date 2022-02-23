<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function register(AuthRequest $request)
    {
        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'data' => [
                'user'  => $user,
                'token' => $token,
            ],
        ], Response::HTTP_CREATED);
    }
}
