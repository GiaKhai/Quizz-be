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
    public function loadingQuestionTest() 
    {
        $ques = new Question();
        $list = $ques->getListQuestionRandom();
        return response()->json($list, 200);
    }

    public function createQuestion(Request $request) 
    {
        $ques = new Question();
        $id_ques= $ques->createData($request);
        $answer_options = $request->answer_choices;
        $correct_answers = $request->answer_correct;
        for ($i = 0; $i < count($answer_options); $i++) {
            $item =json_decode($answer_options[$i]);
            $ans = new Answer();
            if (in_array($item->key, $correct_answers))
            {
                $ans->question_id	=  $id_ques;
                $ans->answer	= $item->content;
                $ans->correct	=  1;
                $ans->saveData($ans);
            }
            else
            {
                $ans->question_id	=  $id_ques;
                $ans->answer	= $item->content;
                $ans->correct	=  0;
                $ans->saveData($ans);
            }
        }
        return response()->json([
            'status' => true,
        ]);
    }
    public function deleteQuestion($id) 
    {
        return Question::destroy($id);
    }
    public function updateQuestion(Request $request) {
        $id_Question= $request->id;
        $answer_options=$request->answer_choices;
        $ques = new Question();
        $ques->updateData($request);
        $correct_answers = $request->answer_correct;
      
        for ($i = 0; $i < count($answer_options); $i++) {
            $item =json_decode($answer_options[$i]);

            $item_id=$item->id;
      
            if (in_array($item->key, $correct_answers))
            {
                $ans = Answer::find($item_id);
                $ans->answer	= $item->content;
                $ans->correct	=  1;
                $ans->saveData($ans);
            }else{
                $ans = Answer::find($item_id);
                $ans->answer	= $item->content;
                $ans->correct	=  0;
                $ans->saveData($ans);
            }
        }
        return response()->json([
            'status' => true,
        ]);
    }
    
    
    
// public function getAnswer() 
//     {
//         $ques = Answer::all();
//         return response()->json($ques, 200);
//     }
}
