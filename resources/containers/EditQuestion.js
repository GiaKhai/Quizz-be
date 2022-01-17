import React, { useEffect } from "react";
import Modaleditquestion from '../js/components/Question/ModalEditQuestion';
import { Form, Input, Row, Col, Modal, Select, DatePicker,Button} from "antd";
import { sendInfoQuestion_Toserver,updateQuestionToServer } from "../actions/question.action";
import { getQuestionAction } from "../actions/question.action";
import { init_info_question } from '../js/components/Question/initModel';
import { getInfoQuestion } from "../actions/question.action";
import { useDispatch, useSelector } from "react-redux";
const Editquestion = ({isModalVisible, handleCancel, setIsModalVisible}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        try {
            const { success } = await updateQuestionToServer(data);
            if (success === true) {
                form.resetFields();
                dispatch(getInfoQuestion(init_info_question))
                dispatch(getQuestionAction());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
    };
    return (
      <Modaleditquestion
        handleSubmit={handleSubmit}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        form={form}
      />
    );
};



export default Editquestion;
