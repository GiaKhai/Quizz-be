import React from "react";
import Modaladdquestion from "../js/components/Question/ModalAddQuestion";
import { Form} from "antd";
import { sendInfoQuestion_Toserver,getQuestionSuccess } from "../actions/question.action";
import { init_info_question } from '../js/components/Question/initModel';
import { getInfoQuestion } from "../actions/question.action";
import { useDispatch } from "react-redux";
import { Service  } from '../js/page/QuestionList/Services/Services';

const Addquestion = ({ isModalVisible, handleCancel, setIsModalVisible,pagination }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        try {
            const { success } = await sendInfoQuestion_Toserver(data);
            if (success === true) {
                form.resetFields();
                dispatch(getInfoQuestion(init_info_question))
                setIsModalVisible(false);
                let body={
                    currentPage:pagination.currentPage,
                    perPage: pagination.perPage
                }
                Service.loadingQuestion(body).then((response)=>{
                    dispatch(getQuestionSuccess(response));
                })
            } else Message.error("Add error");
        } catch (error) {}
        
    };
    
    return (
       <Modaladdquestion
            handleSubmit={handleSubmit}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            form={form}
       />
    );
};

export default Addquestion;
