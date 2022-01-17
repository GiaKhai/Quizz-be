<?php

namespace App\Http\Controllers\API;

use App\Exceptions\InternalException;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

     //Pending
     public function getAuthUser(Request $request)
    {
        Log::info('XACTHUCXXX JWT');
        Log::info($request);

        // $user = JWTAuth::authenticate($request->token);
        try {
            $this->validate($request, [
                'token' => 'required'
            ]);
          
            $user = JWTAuth::authenticate('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY0MTg5MjIzNywiZXhwIjoxNjQyMjUyMjM3LCJuYmYiOjE2NDE4OTIyMzcsImp0aSI6Ik5sSVF4UHFSMGQ5UWlJZU8iLCJzdWIiOjIyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.eK8IMckMZL8gK8FPs9G6yyHV7aRy9990BpJPHi24NcY');

            Log::info($user);
            return response()->json(['user' => $user]);

            
        } 
        catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'message' => 'token het hạn',
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Token Invalid',
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 400,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->get()->first();
        if ($user !==null) {
            if (Hash::check($request->password, $user['password'])) {  //if The passwords match
                $jwt_token = null;
                $customClaims = [
                    'id'=> $user['id'],
                    'name'=>$user['name'],
                    'email'=>$request->email, 
                    'password'=>$request->password,
                    'email_verified_at'=>$user['email_verified_at'], 
                    'role'=>$user['role'], 
                ];
                
                if (!$jwt_token = JWTAuth::attempt($customClaims)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid Email or Password',
                    ], 401);
                }
                $user_info =[
                    'id'=> $user['id'],
                    'name'=>$user['name'],
                    'role'=>$user['role'], 
                ];
                return response()->json([
                    'login_success' => true,
                    'token' => $jwt_token,
                    'user_info'=>$user_info,
                    
                ]);
            }else{
                return response()->json(
                    [
                      'password_not_correct' => true
                    ]);
            }
        }else{
            return response()->json(
                [
                  'user_not_found' => true
                ]);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function logout(Request $request)
    // {
    //     try {
    //         JWTAuth::invalidate(JWTAuth::getToken());
    //         return response()->json(['success' => true]);
    //     } catch (JWTException $error) {
    //         // something went wrong whilst attempting to encode the token
    //         Log::error('Logout: ' . $error->getMessage());
    //         throw new InternalException('ログアウトに失敗しました。');
    //     }
    // }
    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);
 
        try {
            JWTAuth::invalidate($request->token);
 
            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $token = JWTAuth::getToken();
            $newToken = JWTAuth::refresh($token);
            return $this->createNewToken($newToken);
        } catch (\Exception $error) {
            Log::error('Refresh a token: ' . $error->getMessage());
            throw new InternalException('トークンを更新できませんでした。');
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        try {
            /**
             * @var Account
             */
            $jwt_account = JWTAuth::User();
            // $staff = $jwt_account->staff()->getResults();

            // return response()->json($staff);
        } catch (\Exception $error) {
            Log::error('Get the authenticated User: ' . $error->getMessage());
            throw new InternalException('ユーザ情報がありません。');
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        try {
            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60,
                'user' => JWTAuth::user()
            ]);
        } catch (\Exception $error) {
            Log::error('Get the token array structure: ' . $error->getMessage());
            throw new InternalException('新しいトークンを作成できません');
        }
    }
}
