<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TestPlan;
use App\Models\TestList;
use Illuminate\Support\Facades\Log;


class Test extends Controller
{
    public function getPlanList() 
    {
        $plan = new TestPlan();
        $list = $plan->getPlan();    
        return response()->json($list, 200);
    }

    public function getTestList() 
    {  
        $list = TestList::all();
        return response()->json($list, 200);
    }

    public function postTestPlan(Request $request) 
    {
        Log::info($request);
        return TestPlan::create($request->all());
    }

     public function updateTestPlan(Request $request,$id) 
    {
        $plan = TestPlan::find($id);
        $plan->status = $request->status;
        $plan->save();
    }
    
    public function updateInfoTestPlanExeptStatus(Request $request,$id) 
    {
        $plan = TestPlan::find($id);
        $plan->title = $request->title;
        $plan->schedule = $request->schedule;
        $plan->test_id = $request->test_id;
        $plan->test_date = $request->test_date;
        $plan->save();
        $list = TestPlan::all();
        return response()->json($list, 200);
    }
    

     public function destroy($id)
    {
        return TestPlan::destroy($id);
    }
    
}
