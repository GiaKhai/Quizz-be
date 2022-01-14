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
        $ques =  Question::with('answers')->get();
        return $ques;
    }
    public function getListQuestionRandom() 
    {
        $numberRandom=20;
        $ques = Question::inRandomOrder()->limit($numberRandom)->with('answers')->get();
        return $ques;
    }
    public function createData($data) 
    {
        $ques = new Question();
        $ques->question	 = $data->content_question;
        $ques->is_multiple = $data->isMultiple;
        $ques->save();
        return $ques->id;
    }
}
