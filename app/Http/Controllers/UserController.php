<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWT;

class UserController extends Controller
{
    private function getToken($email, $password)
    {
        $token = null;
        try {
            if (!$token = JWTAuth::attempt(['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=> $token
                ]);
            }
        } catch (JWTException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }

        return $token;
    }

    public function getUser() 
    {
        $users = User::orderBy('id', 'desc')->get();
        return response()->json($users, 200);
    }
    /// pending
    public function postUser(Request $request) 
    {
        $user = new User();
        $user->name =$request->name;
        $user->email =$request->email;
        $user->password = Hash::make($request->password);
        $user->role = $request->role;
        $user->is_verified = $request->is_verified;
        $user->save();
        $list =User::all();
        return response()->json($list, 201);
    }

    public function destroy($id)
    {
        $user = new User();
        $user->deleteUser($id);
       
    }
    /**
     * Update user
     */
    public function updateUser(Request $request,$id){
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->save();
    }
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->get()->first();
        if ($user && Hash::check($request->password, $user->password)) // The passwords match...
        {

            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();

            $response = ['success'=>true, 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];
        }
        else
            $response = ['success'=>false, 'data'=>'Record doesnt exists'];

        return response()->json($response, 201);
    }

    public function register(Request $request)
    {
        $payload = [
            'password'=>Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'auth_token'=> ''
        ];

        $user = new User($payload);
        if ($user->save()) {

            $token = self::getToken($request->email, $request->password); // generate user token

            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);

            $user = User::where('email', $request->email)->get()->first();

            $user->auth_token = $token; // update user token

            $user->save();

            $response = ['success'=>true, 'data'=>['name'=>$user->name,'id'=>$user->id,'email'=>$request->email,'auth_token'=>$token]];
        } else
            $response = ['success'=>false, 'data'=>'Couldnt register user'];


        return response()->json($response, 201);
    }

}
