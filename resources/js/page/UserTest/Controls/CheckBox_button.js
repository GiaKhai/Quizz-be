import React ,{ useState,useEffect }from 'react';
import {  Space } from 'antd';
import {
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import '../Css/index.css';
import { Checkbox } from 'antd';

const CheckBoxButton = ({
    list_option,
    handle_getChooseOption,
    isSubmit,
    question_id,
    user_choices,
}) => {
    const [value, setValue] = useState([])
    
    /**
     * handle change
     * @param {*} value
    */
    const onChange = value => {
        handle_getChooseOption(value)
        setValue(value)
    };
   
    useEffect(() => { 
        for(var i =0 ;i<user_choices.length;i++)
        {
            if( question_id === user_choices[i].id_question)
            { 
                setValue(user_choices[i].user_choice)
            }
        }
    })

    /**
     * show correct icon
     * @param {*} body 
     * @returns 
     */
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
  
    /**
     * show incorrect icon
     * @param {*} body 
     * @returns 
     */
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
            <Checkbox.Group
               onChange={onChange}
               disabled={isSubmit===true? true: false}
               defaultValue={value} 
               value={value}
            >
                <Space direction="vertical">
                    {list_option.map((item) =>
                        (
                            <Checkbox key={item.id} className="option_item"  value={item.id}>{item.answer} {checkCorrect(item.correct)} {checkFail(item.correct,value,item.id)}</Checkbox>
                        )
                    )}
                </Space>
             </Checkbox.Group>
        </div>
    );
};




export default CheckBoxButton;
