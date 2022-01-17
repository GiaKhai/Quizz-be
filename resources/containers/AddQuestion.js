import React, { useEffect } from "react";
import Modaladdquestion from "../js/components/Question/ModalAddQuestion";
import { sendInfoQuestion_Toserver } from "../actions/question.action";
import { getQuestionAction } from "../actions/question.action";
import { init_info_question } from '../js/components/Question/initModel';
import { getInfoQuestion } from "../actions/question.action";
import { useDispatch, useSelector } from "react-redux";
const Addquestion = ({ isModalVisible, handleCancel, setIsModalVisible }) => {
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        try {
            const { success } = await sendInfoQuestion_Toserver(data);
            if (success === true) {
                // form.resetFields();
                // dispatch(getListAction());
                dispatch(getInfoQuestion(init_info_question))
                dispatch(getQuestionAction());
                setIsModalVisible(false);
            } else Message.error("Add error");
        } catch (error) {}
        
    };
    
    return (
       <Modaladdquestion
            handleSubmit={handleSubmit}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}

       />
    );
};

export default Addquestion;
