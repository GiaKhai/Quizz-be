<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Answer;


class Question extends Model
{
    protected $fillable = [
        'id',
        'question',
    ];
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function getListQuestion() 
    {
        $ques = Question::with('answers')->get();
        return $ques;
    }
}
