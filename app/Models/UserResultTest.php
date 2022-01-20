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
        'result_test'
    ];
    public function users(){
        return $this->belongsTo(User::class);
    }
    public function testplan(){
        return $this->belongsTo(TestPlan::class);
    }
    
    // public function getUserResult(){
    //     return $list =  TestPlan::with('user_result_test')->get();
    // }
}
