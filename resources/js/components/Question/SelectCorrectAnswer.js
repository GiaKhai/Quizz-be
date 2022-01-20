import React,{ useState ,useEffect} from 'react';
import {Select,Form} from 'antd';
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
import './index.css'
const Selectcorrectanswer = ({statusMultiple}) => {
    const info_question = useSelector((state) => state.inFoQuestionReducer.info_question)
    const answers = info_question.answer_choices
    const [data ,setData] =useState(info_question.answer_correct)
    let isMultiple = null
    if(statusMultiple === 1)
    {
        isMultiple="multiple"
    }
   
    return (
        <Form.Item
            name="answer_correct"
            id="answer_correct"
            label="Đáp án"
        >
            <Select 
                className="select_correct_answer"
                allowClear 
                disabled={false}
                mode={isMultiple}
                defaultValue={data}
            >
                {answers?.map((ans,index) => (
                    <Option key={index} value={ans.key}>{ans.key}</Option>
                ))}
            </Select>
        </Form.Item>
    );
};


export default Selectcorrectanswer;
