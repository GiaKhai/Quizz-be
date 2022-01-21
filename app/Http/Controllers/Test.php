<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TestPlan;
use App\Models\TestList;
use App\Models\Answer;
use App\Models\UserResultTest;
use Illuminate\Support\Facades\Log;


class Test extends Controller
{
    /**
     * get list plan 
     * @returns 
    */
    public function getPlanList() 
    {
        $list  = TestPlan::all();
        return response()->json($list, 200);
    }

    /**
     * get list plan have public status 
     * @returns 
    */
    public function  getPlanListPublist() 
    {
        $plan = new TestPlan();
        $list = $plan->getPlanPublic();    
        return response()->json($list, 200);
    }
    
    /**
     * get test list
     * @returns 
    */
    public function getTestList() 
    {  
        $list = TestList::all();
        return response()->json($list, 200);
    }
    /**
     * create a test list
     * @param {*} $request
     * @returns 
    */
    public function postTestList(Request $request) 
    {   
        return TestList::create($request->all());
    }
    /**
     * delete a test item
     * @param {*} $id
     * @returns 
    */
    public function deleteTestItem($id) 
    {   
        return TestList::destroy($id);
    }

    /**
     * update a test item
     * @param {*} $id
     * @param {*} $request
     * @returns 
    */
    public function updateTestItem(Request $request,$id) 
    {   
        $test = TestList::find($id);
        $test->title = $request->title;
        $test->save();
        $list = TestList::all();
        return response()->json($list, 200);
    }
    
    /**
     * create a plan
     * @param {*} $request
     * @returns 
    */
    public function postTestPlan(Request $request) 
    {
        return TestPlan::create($request->all());
    }
    
    /**
     * update a status of plan
     * @param {*} $request
     * @param {*} $id
     * @returns 
    */
    public function updateTestPlan(Request $request,$id) 
    {
        $plan = TestPlan::find($id);
        $plan->status = $request->status;
        $plan->save();
    }
    
    /**
     * update a plan
     * @param {*} $request
     * @param {*} $id
     * @returns 
    */
    public function updateInfoTestPlanExeptStatus(Request $request,$id) 
    {
        $plan = TestPlan::find($id);
        $plan->title = $request->title;
        $plan->schedule = $request->schedule;
        $plan->test_date = $request->test_date;
        $plan->number_question = $request->number_question;
        $plan->number_question_pass = $request->number_question_pass;
        $plan->save();
        $list = TestPlan::all();
        return response()->json($list, 200);
    }
    
    /**
     *delete a plan
     * @param {*} $id
     * @returns 
    */
    public function destroy($id)
    {
        return TestPlan::destroy($id);
    }
    /**
     * check status of a plan
     * @param {*} $id
     * @returns 
    */
    public function checkPlan(Request $request)
    {
        $plan = TestPlan::find($request->planTest_id);
        $status=$plan['status'];
        if($status === 1){
            return response()->json([
                'status' => true,
            ]);
        }else{
            return response()->json([
                'status' => false,
            ]);
        }
    }
    
    /**
     * check result after user do a test
     * @param {*} $request
     * @returns 
    */
    public function resultTest(Request $request)
    {
        $user_id= $request->id_user;
        $plan_id= $request->planTest_id;
        $plan = TestPlan::find($plan_id);
        $conditionPass =  $plan->number_question_pass;
        $data =$request->data_choice;
        $checkCorrect = 0;
        $resultTest = 0;
        $totalQuestion=count($data);
        for ($i = 0; $i < count($data); $i++) {
            $data_test =json_decode($data[$i]); 
            $choices = $data_test->user_choice;
            $questionID =$data_test->id_question;
            $countCorrectOfQuestion = Answer::where('question_id', $questionID)
                                              ->Where('correct',1)
                                              ->count();
            
            $numberCorrectEachQuestion =0;
            if(count($choices) > 0){
                for ($j = 0; $j < count($choices); $j++) {
                    $id_answer_choice = $choices[$j];
                    $answer = Answer::find($id_answer_choice);
                    $correct = $answer['correct'];
                    if($correct == 1 ){
                        $numberCorrectEachQuestion= $numberCorrectEachQuestion+1;
                    }
                    if($numberCorrectEachQuestion == $countCorrectOfQuestion )
                    {
                        $checkCorrect =  $checkCorrect+1;
                    }
                } 
            }   
        }
        
        if($checkCorrect >= $conditionPass ){
            $resultTest=1;
        }
        $history = new UserResultTest();
        $saveHistory =$history->saveHistoryUserTest($user_id, $plan_id,$totalQuestion,$resultTest,json_encode($data), $checkCorrect);

        return response()->json([
            'correct' => $checkCorrect ,
            'totalQuestion'=>  $totalQuestion,
            'resultTest'=>$resultTest,
        ]);
    }
    
    /**
     * check User Exist in History By Plan ID
     * @param {*} $request
     * @returns 
    */
    public function checkUserExistHistoryByPlanID(Request $request)
    {
         $user_id= $request->user_id;
         $plan_id= $request->plan_id;
         $history = new UserResultTest();
         $resultCheck = $history->checkUserExistInHistoryByPlanID($user_id,$plan_id);    
         return response()->json([
            'resultCheck' => $resultCheck,
        ]);
    }
    
    /**
     * get all plan
     * @returns 
    */
    public function getPlanResult() 
    {
        $list = UserResultTest::all();
        return response()->json($list, 200);
    }
    
    /**
     *  post Plan Result
     * @param {*} $request
     * @returns 
    */
    public function postPlanResult(Request $request) 
    {
        return UserResultTest::create($request->all());
    }
    
}
