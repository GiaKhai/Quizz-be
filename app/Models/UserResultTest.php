<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\TestPlan;
class UserResultTest extends Model
{
    // use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'plan_id',
        "number_correct",
        "total_question",
        'pass_status',
        'result_test'
    ];
    public function users(){
        return $this->belongsTo(User::class);
    }
    public function testplan(){
        return $this->belongsTo(TestPlan::class);
    }
    /**
     * sava user test to history
     * @param {*} $id
     * @param {*} $user_id
     *  @param {*} $plan_id
     *  @param {*} $totalQuestion
     *  @param {*} $resultTest
     *  @param {*} $detailUserTest
     *  @param {*} $numberCorrect
     * @returns 
    */
    public function saveHistoryUserTest($user_id, $plan_id,$totalQuestion,$resultTest,$detailUserTest,$numberCorrect){
        $historyTest = new UserResultTest();
        $historyTest->user_id = $user_id;
        $historyTest->plan_id = $plan_id;
        $historyTest->total_question = $totalQuestion;
        $historyTest->pass_status = $resultTest;
        $historyTest->result_test = $detailUserTest;
        $historyTest->number_correct = $numberCorrect;
        $historyTest->save();
    }

     /**
     * check User Exist In History By PlanID
     *  @param {*} $user_id
     *  @param {*} $plan_id
     * @returns 
    */
    public function checkUserExistInHistoryByPlanID($user_id,$plan_id){
        $result = false;
        $check =  UserResultTest::where('user_id', $user_id)->where('plan_id', $plan_id)->count();
        if( $check >0)
        {
            $result = true;
        }
        return $result;
    }
    
    // public function getUserResult(){
    //     return $list =  TestPlan::with('user_result_test')->get();
    // }
}
