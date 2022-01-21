import React from "react";
import { getUserAction, postUserAction } from "../actions/user.action";
import ModalAddUser from "../js/components/User/ModalAddUser";
import { message as Message } from "antd";

import { useDispatch } from "react-redux";

const AddUser = ({ isModalVisible, handleCancel, form, setIsModalVisible }) => {
    const dispatch = useDispatch();
     /**
     * handle submit data
     */
    const handleSubmit = async () => {
        try {
            await form.validateFields();
            let a = form.getFieldsValue();
            var b = { is_verified: "1" };
            const body = { ...a, ...b };
            const { success } = await postUserAction(body);
            if (success) {
                form.resetFields();
                dispatch(getUserAction());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
    };

    return (
        <ModalAddUser
            form={form}
            handleSubmit={handleSubmit}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
        />
    );
};
export default AddUser;
