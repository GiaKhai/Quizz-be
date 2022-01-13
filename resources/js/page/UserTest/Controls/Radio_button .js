import React ,{ useState,useEffect }from 'react';
import { Radio, Space } from 'antd';
import {
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import '../Css/index.css';
const RadioButton = ({
    list_option,
    handle_getChooseOption,
    isSubmit,
    question_id,
    user_choices,
}) => {
    const [value, setValue] = useState("")
    const onChange = e => {
        handle_getChooseOption(e.target.value)
        setValue(e.target.value)
    };
    useEffect(() => {
        for(var i =0 ;i<user_choices.length;i++)
        {
            if( typeof user_choices[i] === 'string')
            {
                var item = JSON.parse(user_choices[i]);
                if(question_id === item.id_question){
                    setValue(item.user_choice[0])
                }
            }else{
                if( question_id === user_choices[i].id_question)
                {
                    
                    setValue(user_choices[i].user_choice[0])
                }
            }
        }
    })

    //show correct icon
    function checkCorrect(correct)
    {
        if(isSubmit === true){
            if( correct === 1)
            {
                return <CheckOutlined className="icon_check_correct"/>
            }
           
        }else{
            return ''
        }
    }
    //show incorrect icon
    function checkFail(correct,value,id_opiton)
    {
        if(isSubmit === true){
            if( value !== undefined  && value === id_opiton)
            {
                if( correct !== 1)
                {
                    return <CloseOutlined className="icon_check_false"/>
                }
            }
        }else{
            return ''
        }
    }
    return (
        <div>
            <Radio.Group  onChange={isSubmit===true?null:onChange} defaultValue={value} value={value}>
            <Space direction="vertical">
                {list_option.map((item,index) =>
                    (
                    <Radio key={index} className="option_item" value={item.id}>{item.answer} {checkCorrect(item.correct)} {checkFail(item.correct,value,item.id)}</Radio>
                    )
                )}
            </Space>
            </Radio.Group>
        </div>
    );
};




export default RadioButton;
