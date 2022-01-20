import React ,{ useState ,useEffect}from 'react';
import {Select,Form} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getInfoQuestion } from "../../../actions/question.action";
import './index.css'
const { Option } = Select;


const Selectmultiple = () => {
    const dispatch = useDispatch();
    const info_question = useSelector((state) => state.inFoQuestionReducer.info_question)
  
    const [status ,setStatus] =useState(info_question.isMultiple)
    let descriptionDefault =''
    if(status !== 0)
    {
        descriptionDefault="Có"
    }else{
        descriptionDefault="Không"
    }
    let choices =[
        {
            status:1,
            description:"Có"
        },
        {
            status:0,
            description:"Không"
        },
    ]
    return (
        <Form.Item
            name="isMutiple"
            id="isMutiple"
            label="Cho phép chọn nhiều đáp án đúng ?"
        >
            <Select 
                className="SelectMutilple_question"
                defaultValue={status}
                disabled={false}
            >
                {choices?.map((item,index) => (
                        <Option key={index} value={item.status}>{item.description}</Option>
                ))}
            </Select>
        </Form.Item>
    );
};
export default Selectmultiple;
