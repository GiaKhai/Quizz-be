<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Question;
use App\Models\Answer;
use App\Models\TestPlan;
use Illuminate\Support\Facades\Log;
class QuestionController extends Controller
{
    
    public function getQuestion(Request $request) 
    {
        $ques = new Question();
        $list = $ques->getListQuestion();
        

        $arrayData =json_decode(json_encode($list), true);
        for($i=0;$i<count($arrayData);$i++)
        {
            $arrayData[$i]['index']=$i+1;
        }
        $totalQues =  Question::with('answers')->count();
        $currentPage = $request->currentPage-1;
        $perPage = $request->perPage;
        $pagedData = array_slice($arrayData, $currentPage * $perPage, $perPage);
        if(count($pagedData)==0)
        {
            $currentPage=$currentPage-1;
            $pagedData = array_slice($arrayData, $currentPage * $perPage, $perPage);
        }
        return response()->json([
            'currentPage' => $currentPage,
            'perPage' => $perPage,
            'totalPage'=>$totalQues,
            'data'=>$pagedData,
        ]);
        // return response()->json($pagedData, 200);
    }
    
    public function loadingQuestionTest(Request $request) 
    {   
        $id_plan = $request->planTest_id;
        $plan = TestPlan::find($id_plan);
        $numberQuestion =  $plan->number_question;
        $ques = new Question();
        $list = $ques->getListQuestionRandom($numberQuestion);
        
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
