<?php

namespace App\Http\Requests;

use App\Exceptions\ValidateException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ];
    }

    /**
     * Change attributes name.
     */
    public function attributes()
    {
        return [
            'email' => 'メールアドレス',
            'password' => 'パスワード'
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     **/
    protected function failedValidation(Validator $validator)
    {
        throw new ValidateException($validator);
    }
}
