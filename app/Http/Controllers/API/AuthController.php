<?php

namespace App\Http\Controllers\API;

use App\Exceptions\InternalException;
use App\Exceptions\NotFoundException;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $credentials['is_verified'] = 1;

        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                throw new NotFoundException('メールアドレスが違います。');
            }
        } catch (JWTException $error) {
            // something went wrong whilst attempting to encode the token
            Log::error('Login: ' . $error->getMessage());
            throw new InternalException('メールアドレス又はパスワードが違います。');
        }

        /**
         * @var Account
         */
        $jwt_account = JWTAuth::User();

        // all good so return the token
        return response()->json([
            'success' => true, 'data' => [
                'token' => $token,
                // 'user' => $jwt_account->getResults()
            ]
        ], Response::HTTP_OK);
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
