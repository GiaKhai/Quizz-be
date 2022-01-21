import React from "react";
import Modaleditquestion from '../js/components/Question/ModalEditQuestion';
import { Form} from "antd";
import { updateQuestionToServer,getQuestionSuccess } from "../actions/question.action";
import { init_info_question } from '../js/components/Question/initModel';
import { getInfoQuestion } from "../actions/question.action";
import { useDispatch } from "react-redux";
import { Service  } from '../js/page/QuestionList/Services/Services';
const Editquestion = ({isModalVisible, handleCancel, setIsModalVisible,pagination}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
     /**
     * handle submit data
     */
    const handleSubmit = async (data) => {
        try {
            const { success } = await updateQuestionToServer(data);
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
      <Modaleditquestion
        handleSubmit={handleSubmit}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        form={form}
      />
    );
};



export default Editquestion;
