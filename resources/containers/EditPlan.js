import React, { useEffect } from "react";
import { getListAction } from "../actions/testList.action";
import { useDispatch, useSelector } from "react-redux";
import { message as Message } from "antd";
import { getPlanAction,updateTestPlan,getPlanActionPublic } from "../actions/testPlan.action";
import ModalEditPlan from "../js/components/Plan/ModalEditPlan";

const EditPlan= ({ isModalVisible, handleCancel, form, setIsModalVisible,dataEdit}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListAction());
    }, [dispatch]);
    
    //handle submit data
    const handleSubmit = async (test) => {
        try {
            await form.validateFields();
            let { titleEdit, test_dateEdit, number_question_passEdit, number_questionEdit, scheduleEdit} =
                form.getFieldsValue();
            let body = {
                title:titleEdit,
                test_date: test_dateEdit.format("YYYY-MM-DD"),
                number_question_pass:number_question_passEdit,
                number_question:number_questionEdit,
                schedule:scheduleEdit,
            };
            let id = dataEdit.id
         
            const { success } = await updateTestPlan(body,id);
            if (success) {
                form.resetFields();
                dispatch(getPlanAction());
                dispatch(getPlanActionPublic());
                setIsModalVisible(false);
            } else Message.error("Edit error");
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
