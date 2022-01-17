import React from "react";
import { getUserAction, postUserAction,updateUserAction } from "../actions/user.action";
import ModalAddUser from "../js/components/User/ModalAddUser";
import { message as Message } from "antd";

import { useDispatch } from "react-redux";
import ModalEditUser from "../js/components/User/ModalEditUser";

const EditUser = ({ isModalVisible, handleCancel, form, setIsModalVisible,dataEdit }) => {
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        try {
            await form.validateFields();
            let { name, email, role} = form.getFieldsValue();
            let body = { name, email, role };
            let id = dataEdit.id
            const { success } = await updateUserAction(id,body);
            if (success) {
                form.resetFields();
                dispatch(getUserAction());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
    };

    return (
        <ModalEditUser
            form={form}
            handleSubmit={handleSubmit}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            dataEdit={dataEdit}
        />
    );
};
export default EditUser;
