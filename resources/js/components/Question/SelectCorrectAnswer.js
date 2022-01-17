import React,{ useState ,useEffect} from 'react';
import {Select,Form} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getInfoQuestion } from "../../../actions/question.action";
const { Option } = Select;
import './index.css'
const Selectcorrectanswer = ({statusMultiple}) => {
    const dispatch = useDispatch();
    const info_question = useSelector((state) => state.inFoQuestionReducer.info_question)
    const answers = info_question.answer_choices
    const [data ,setData] =useState(info_question.answer_correct)
    // let statusMultiple= info_question.isMultiple
    console.log("info_question:",info_question)
    console.log("statusMultiple:",statusMultiple)
    let isMultiple = null
    if(statusMultiple === 1)
    {
        isMultiple="multiple"
    }
    //handle change value select
    // function handleChange(value) {
    //     let new_info={...info_question}
    //     if(value !== undefined)
    //     {
    //         if(statusMultiple === 1)
    //         {
    //             new_info.answer_correct= value
    //         }else{
    //             new_info.answer_correct=[value]
    //         }
    //     }else{
    //         new_info.answer_correct=[]
    //     }
    //     dispatch(getInfoQuestion(new_info))
    // }
    // useEffect(() => { 
    //     let initDefaultValue=info_question.answer_correct
    //     setData(initDefaultValue)
    // },[statusMultiple])
    
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
                // onChange={handleChange}
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
