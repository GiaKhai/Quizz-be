import React  , { useEffect }from 'react';

import ModalAddTestList from '../js/components/TestList/ModalTestList';
import { message as Message } from "antd";
import { postTestListAction } from "../actions/testList.action";
import { getListAction } from "../actions/testList.action";
import { useDispatch, useSelector } from "react-redux";
    
const Addtestlist = ({isModalVisible, handleCancel, form, setIsModalVisible}) => {
    const dispatch = useDispatch();

    //handle submit data
    const handleSubmit = async (test) => {
        try {
            await form.validateFields();
            let { title } =
                form.getFieldsValue();
            let body = {
                title,
            };
            const { success } = await postTestListAction(body);
            if (success === true) {
                form.resetFields();
                dispatch(getListAction());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
    };
    return (   
            <ModalAddTestList
                form={form}
                handleSubmit={handleSubmit}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
            />
        
    );
};




export default Addtestlist;
