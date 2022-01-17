import axios from "axios";
import { questionURL,createQuestion } from "../constants/backend_url";
import { questionConstants } from "../constants/question.contants";
import { message as Message } from "antd";

const getQuestionSuccess = (data) => {
    return {
        type: questionConstants.GET_QUESTION_SUCCESS,
        data,
    };
};

const getQuestionFail = () => {
    return {
        type: questionConstants.GET_QUESTION_FAIL,
    };
};

export const getQuestionAction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(questionURL);
            if (response.status === 200) {
                dispatch(getQuestionSuccess(response));
            }
        } catch (error) {
            dispatch(getQuestionFail());
        }
    };
};

export const getInfoQuestion = (data) => {
    return {
        type: questionConstants.GET_INFO_QUESTION,
        data,
    };
};
export const sendInfoQuestion_Toserver = async (data) => {
   
   let answer_option = data.answer_choices
   let newArr=[]
   for (var i=0;i<answer_option.length;i++)
    {
     newArr.push(JSON.stringify(answer_option[i]));
    }
    if(data.answer_correct.length === 0){
        Message.warn("Bạn chưa thêm đáp án ")
    }
   data.answer_choices= newArr

   try {
        const response = await axios.post(createQuestion,data);
        var result = response.data
        if (result.status === true) {
            Message.success("Tạo câu hỏi thành công");
            return { success: true };
        }        
    } catch (error) {
        Message.error("Check plan false");
        return { success: false };
    }
  
  
};