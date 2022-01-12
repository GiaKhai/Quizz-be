import React ,{ useState,useEffect }from 'react';
import { Radio, Space } from 'antd';


const RadioButton = ({
    list_option,
    handle_getChooseOption,
}) => {
    const [value, setValue] = useState("")
    const onChange = e => {
        handle_getChooseOption(e.target.value)
        setValue(e.target.value)
    };
    return (
        // <Radio.Group onChange={answer.length >0 ? null : onChange} defaultValue={user_choice} value={value} >
        //     <Space direction="vertical">
        //         {list_option.map((item,index) =>
        //             (
        //             <Radio className="option_item"value={item.option}>{item.option}. {item.content} {answer.includes(item.option) === true ? icon_true:''} { (item.option ===user_choice &&  answer.includes(item.option) === false)? icon_false : ''}</Radio>
        //             )
        //         )}
        //     </Space>
        // </Radio.Group>

        <Radio.Group  onChange={onChange}>
        <Space direction="vertical">
            {list_option.map((item,index) =>
                (
                <Radio className="option_item" value={item.id}>{item.answer}</Radio>
                )
            )}
        </Space>
        </Radio.Group>
    );
};




export default RadioButton;
