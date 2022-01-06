<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TestPlan;


class TestList extends Model
{
    protected $fillable = [
        'id',
        'title',
    ];

    public function testLists()
    {
        return $this->hasMany(TestPlan::class);
    }
}
