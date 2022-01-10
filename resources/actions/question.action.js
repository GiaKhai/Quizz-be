import axios from "axios";
import { questionURL } from "../constants/backend_url";
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
            console.log("response:",response)
            if (response.status === 200) {
                dispatch(getQuestionSuccess(response));
            }
        } catch (error) {
            dispatch(getQuestionFail());
        }
    };
};
