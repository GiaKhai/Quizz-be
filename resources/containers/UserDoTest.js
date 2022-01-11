import React from 'react';
import ModalDoTest from '../js/components/DoTest/ModalDoTest';
import { useForm } from "antd/lib/form/Form";
import { checkPlan } from "../actions/checkPlan.action";

const Userdotest = ({isModalVisible, handleCancel, setIsModalVisible}) => {
    const [form] = useForm();
    const handleSubmit = async (test) => {
        let { planTest_id } =  form.getFieldsValue();
        let body = {
            planTest_id,
        };
        const { success } = await checkPlan(body);

    }
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
