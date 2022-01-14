import React ,{ useState ,useEffect}from 'react';
import {Select} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getInfoQuestion } from "../../../actions/question.action";
import './index.css'
const { Option } = Select;


const Selectmultiple = () => {
    const dispatch = useDispatch();
    const info_question = useSelector((state) => state.inFoQuestionReducer.info_question)
    const [status ,setStatus] =useState(0)
    let initDefaultValue=info_question.isMultiple
    let descriptionDefault =''
    // if(initDefaultValue !== 0)
    // {
    //     descriptionDefault="Có"
    // }else{
    //     descriptionDefault="Không"
    // }
    // let choices =[
    //     {
    //         status:1,
    //         description:"Có"
    //     },
    //     {
    //         status:0,
    //         description:"Không"
    //     },
    // ]
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
    function handleChange(value) {
        let new_info={...info_question}
        new_info.isMultiple= value
        dispatch(getInfoQuestion(new_info))
    }
    useEffect(() => { 
        let initDefaultValue=info_question.isMultiple
        setStatus(initDefaultValue)
    },[])
    return (
        <Select 
                className="SelectMutilple_question"
                defaultValue={descriptionDefault}
                disabled={false}
                onChange={handleChange}
        >
                {choices?.map((item,index) => (
                    <Option key={index} value={item.status}>{item.description}</Option>
                ))}
        </Select>
    );
};


export default Selectmultiple;
