<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TestList;
use App\Models\UserResultTest; //

class TestPlan extends Model
{
    protected $fillable = [
        'id',
        'title',
        'schedule',
        'test_date',
        'status',
        'number_question',
        'number_question_pass'
    ];

    // public function testPlan()
    // {
    //     return $this->belongsTo(TestList::class);
    // }
    public function userResultTest()//
    {
        // return $this->belongsTo(UserResultTest::class);
        return $this->hasMany(UserResultTest::class);
    }

    /**
     * get plan list
     * @returns 
    */
    public function getPlan() 
    {
        $plan = TestPlan::with('TestPlan')->get();
        return $plan;
    }
    /**
     * get plan list have public status
     * @returns 
    */
    public function getPlanPublic() 
    {
        $plan = TestPlan::where('status', 1)->get();
        return $plan;
    }
}
