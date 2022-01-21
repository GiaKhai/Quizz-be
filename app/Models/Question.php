<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
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
    
    /**
     * get list question
     * @param {*} $data 
     * @returns 
    */
    public function getListQuestion() 
    {
       
        $queslist =  Question::with('answers')->get();
        return $queslist;
    }

    
    /**
     * get List Question Random
     * @param {*} $numberQuestion
     * @returns 
    */
    public function getListQuestionRandom($numberQuestion) 
    {
        $ques = Question::inRandomOrder()->limit($numberQuestion)->with('answers')->get();
        return $ques;
    }

    /**
     * create a question
     * @param {*} $data
     * @returns 
    */
    public function createData($data) 
    {
        $ques = new Question();
        $ques->question	 = $data->content_question;
        $ques->is_multiple = $data->isMultiple;
        $ques->save();
        return $ques->id;
    }

    /**
     * update a question
     * @param {*} $data
     * @returns 
    */
    public function updateData($data) 
    {
        $id_Question= $data->id;
        $ques = Question::find($id_Question);
        $ques->question = $data->content_question;
        $ques->is_multiple = $data->isMultiple;
        $ques->save();
    }
  
}
