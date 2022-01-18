import React from "react";
import ModalDoTest from "../js/components/DoTest/ModalDoTest";
import { useForm } from "antd/lib/form/Form";
import { checkPlan } from "../actions/checkPlan.action";
import { useHistory, useParams } from "react-router-dom";
const Userdotest = ({ isModalVisible, handleCancel, setIsModalVisible }) => {
    let history = useHistory();
    const [form] = useForm();
    const handleSubmit = async (test) => {
        var { planTest_id } = form.getFieldsValue();
        let body = {
            planTest_id,
        };
        console.log(planTest_id);
        const { success } = await checkPlan(body);
        if (success) {
            form.resetFields();
            setIsModalVisible(false);
            history.push(`/do_test/${planTest_id}`);
        }
    };
    return (
        <ModalDoTest
            handleSubmit={handleSubmit}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            form={form}
        />
    );
};

export default Userdotest;
