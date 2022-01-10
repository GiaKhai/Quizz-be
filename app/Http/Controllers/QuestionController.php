<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Facades\Log;
class QuestionController extends Controller
{
    
    public function getQuestion() 
    {
        $ques = new Question();
        $list = $ques->getListQuestion();
        return response()->json($list, 200);
    }

// public function getAnswer() 
//     {
//         $ques = Answer::all();
//         return response()->json($ques, 200);
//     }
}
