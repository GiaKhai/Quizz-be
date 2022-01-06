<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TestList;


class TestPlan extends Model
{
    protected $fillable = [
        'id',
        'title',
        'schedule',
        'test_date',
        'status',
        'test_id'
    ];

    public function testPlan()
    {
        return $this->belongsTo(TestList::class);
    }

    public function getPlan() 
    {
        $plan = TestPlan::with('TestPlan')->get();
        return $plan;
    }
}
