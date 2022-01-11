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
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

     //Pending
    public function login(LoginRequest $request)
    {
    
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->email)->get()->first();
        // Log::info("data user found");
        // Log::info($user);
        // $credentials['is_verified'] = 1;
        if ($user !==null) {

            if (Hash::check($request->password, $user['password'])) {  //if The passwords match
                Log::info('TOKEN LOGIN');
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
                return response()->json([
                    'login_success' => true,
                    'token' => $jwt_token,
                ]);
            }else{
                return response()->json(
                    [
                      'password_not_correct' => true
                    ]);
            }
            // $x = Hash::check($request->password, $user['password']);
            // Log::info($user[$x]);
        }else{
            return response()->json(
                [
                  'user_not_found' => true
                ]);
        }
      

        // try {
        //     // attempt to verify the credentials and create a token for the user
        //     if (!$token = JWTAuth::attempt($credentials)) {
        //         throw new NotFoundException('メールアドレスが違います。');
        //     }
        // } catch (JWTException $error) {
        //     // something went wrong whilst attempting to encode the token
        //     Log::error('Login: ' . $error->getMessage());
        //     throw new InternalException('メールアドレス又はパスワードが違います。');
        // }

        /**
         * @var Account
         */
        $jwt_account = JWTAuth::User();
        
        // all good so return the token
        // return response()->json([
        //     'success' => true, 'data' => [
        //         'token' => $token,
        //         // 'user' => $jwt_account->getResults()
        //     ]
        // ], Response::HTTP_OK);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['success' => true]);
        } catch (JWTException $error) {
            // something went wrong whilst attempting to encode the token
            Log::error('Logout: ' . $error->getMessage());
            throw new InternalException('ログアウトに失敗しました。');
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
