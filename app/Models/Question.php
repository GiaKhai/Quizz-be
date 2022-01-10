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
        $numberRandom=2;
        $ques =  Question::inRandomOrder()->limit($numberRandom)->with('answers')->get();
        return $ques;
    }
}
