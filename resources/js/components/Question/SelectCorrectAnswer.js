import React from 'react';
import {Select} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getInfoQuestion } from "../../../actions/question.action";
const { Option } = Select;
import './index.css'
const Selectcorrectanswer = ({}) => {
    const dispatch = useDispatch();
    const info_question = useSelector((state) => state.inFoQuestionReducer.info_question)
    const answers = info_question.answer_choices
    let statusMultiple= info_question.isMultiple
    let isMultiple = null
    if(statusMultiple === 1)
    {
        isMultiple="multiple"
    }
    //handle change value select
    function handleChange(value) {
        let new_info={...info_question}
        if(value !== undefined)
        {
            if(statusMultiple === 1)
            {
                new_info.answer_correct= value
            }else{
                new_info.answer_correct=[value]
            }
        }else{
            new_info.answer_correct=[]
        }
        dispatch(getInfoQuestion(new_info))
    }
    return (
        <div>
            <Select 
                className="select_correct_answer"
                allowClear 
                disabled={false}
                onChange={handleChange}
                mode={isMultiple}
            >
                {answers?.map((ans,index) => (
                    <Option key={index} value={ans.key}>{ans.key}</Option>
                ))}
            </Select>
        </div>
    );
};


export default Selectcorrectanswer;
