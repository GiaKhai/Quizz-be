<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;


class Answer extends Model
{
    protected $fillable = [
        'id',
        'question_id',
        'answer',
        'correct'
    ];

    public function answers()
    {
        return $this->belongsTo(Question::class);
    }
    public function saveData($data)
    {
        $data->save();
    }
}
