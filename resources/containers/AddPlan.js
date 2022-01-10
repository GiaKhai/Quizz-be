import React, { useEffect } from "react";
import { getListAction } from "../actions/testList.action";
import ModalAddPlan from "../js/components/Plan/ModalAddPlan";
import { useDispatch, useSelector } from "react-redux";
import { message as Message } from "antd";
import { getPlanAction, postPlanAction } from "../actions/testPlan.action";

const AddUser = ({ isModalVisible, handleCancel, form, setIsModalVisible }) => {
    const dispatch = useDispatch();
    const testList = useSelector((state) => state.testListReducers.testList);
    useEffect(() => {
        dispatch(getListAction());
    }, [dispatch]);

    const handleSubmit = async (test) => {
        try {
            await form.validateFields();
            let { title, test_date, test_id, schedule, status } =
                form.getFieldsValue();
            let body = {
                title,
                test_date: test_date.format("YYYY-MM-DD"),
                test_id,
                schedule,
                status,
            };
            const { success } = await postPlanAction(body);
            if (success ) {
                form.resetFields();
                dispatch(getPlanAction());
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
            testList={testList}
        />
    );
};
export default AddUser;
