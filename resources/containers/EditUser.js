import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message as Message } from "antd";
import { updateUserAction,getUserAction } from "../actions/user.action";
import ModalEditUser from "../js/components/User/ModalEditUser";

const EditUser = ({ isModalVisible, handleCancel, form, setIsModalVisible,dataEdit }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserAction());
    }, [dispatch])

    const handleSubmit = async (test) => {
        let id = dataEdit.id
        try {
            await form.validateFields();
            let { nameEdit, roleEdit,emailEdit } =
                form.getFieldsValue();
            let body = {
                name:nameEdit, 
                role:roleEdit,
                email:emailEdit
            };
            
            const { success } = await updateUserAction(body,id);
            
            if (success ) {
                form.resetFields();
                dispatch(getUserAction());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
    };

    return (

        <ModalEditUser
            handleSubmit={handleSubmit}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            form={form}
            dataEdit={dataEdit}
        />
    );
};
export default EditUser;
