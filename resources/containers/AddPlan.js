import React, { useEffect } from "react";
import ModalAddPlan from "../js/components/Plan/ModalAddPlan";
import { useDispatch } from "react-redux";
import { message as Message } from "antd";
import { getPlanAction, postPlanAction,getPlanActionPublic } from "../actions/testPlan.action";

const AddUser = ({ isModalVisible, handleCancel, form, setIsModalVisible }) => {
    const dispatch = useDispatch();
    useEffect(() => {
    }, [dispatch]);

    /**
     * handle submit
    */
    const handleSubmit = async () => {  
        try {
            await form.validateFields();
            let { title, test_date, schedule, status, number_question_pass, number_question } =
                form.getFieldsValue();
            let body = {
                title,
                test_date: test_date.format("YYYY-MM-DD"),
                number_question_pass,
                number_question,
                schedule,
                status,
            };
            const { success } = await postPlanAction(body);
            if (success ) {
                form.resetFields();
                dispatch(getPlanAction());
                dispatch(getPlanActionPublic());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
    };

    return (
        <ModalAddPlan
            form={form}
            handleSubmit={handleSubmit}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
        />
    );
};
export default AddUser;
