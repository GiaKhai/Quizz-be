import React, { useEffect } from "react";
import { getListAction } from "../actions/testList.action";
import { useDispatch, useSelector } from "react-redux";
import { message as Message } from "antd";
import { getPlanAction,updateTestPlan } from "../actions/testPlan.action";
import ModalEditPlan from "../js/components/Plan/ModalEditPlan";

const EditPlan= ({ isModalVisible, handleCancel, form, setIsModalVisible,dataEdit}) => {
    const dispatch = useDispatch();
    // const testList = useSelector((state) => state.testListReducers.testList);

    useEffect(() => {
        dispatch(getListAction());
    }, [dispatch]);
    
    //handle submit data
    const handleSubmit = async (test) => {
        try {
            await form.validateFields();
            let { title, test_date, number_question_pass, number_question, schedule} =
                form.getFieldsValue();
            let body = {
                title,
                test_date: test_date.format("YYYY-MM-DD"),
                number_question_pass,
                number_question,
                schedule,
            };
            let id = dataEdit.id
         
            const { success } = await updateTestPlan(body,id);
            if (success) {
                form.resetFields();
                dispatch(getPlanAction());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
    };

    return (
        <ModalEditPlan
            form={form}
            handleSubmit={handleSubmit}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            dataEdit={dataEdit}
        />
    );
};
export default EditPlan;
