import React  from 'react';
import { message as Message } from "antd";
import { updateTestListAction } from "../actions/testList.action";
import { getListAction } from "../actions/testList.action";
import { useDispatch} from "react-redux";
import EditModalTestList from '../js/components/TestList/EditModalTestList';
    
const Edittestlist = ({isModalVisible, handleCancel, form, setIsModalVisible,dataEdit}) => {
    const dispatch = useDispatch();
    
     /**
     * handle submit data
     */
    const handleSubmit = async () => {
        try {
            await form.validateFields();
            let { title } = form.getFieldsValue();
            let id =dataEdit.id
            let body = {
                title,
            };
            const { success } = await updateTestListAction(id,body);
            if (success === true) {
                form.resetFields();
                dispatch(getListAction());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
    };
    return (   
            <EditModalTestList
                form={form}
                handleSubmit={handleSubmit}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                dataEdit={dataEdit}
            />
        
    );
};
export default Edittestlist;
