import axios from "axios";
import { testPlanURL ,testPlanURLPublic} from "../constants/backend_url";
import { testPlanConstants } from "../constants/testPlan.contants";
import { message as Message } from "antd";

const getPlanSuccess = (data) => {
    return {
        type: testPlanConstants.GET_PLAN_SUCCESS,
        data,
    };
};
const getPlanPublic = (data) => {
    return {
        type: testPlanConstants.GET_PLAN_PUBLIC,
        data,
    };
};

const getPlanFail = () => {
    return {
        type: testPlanConstants.GET_PLAN_FAIL,
    };
};

export const getPlanAction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(testPlanURL);
            if (response.status === 200) {
                dispatch(getPlanSuccess(response));
            }
        } catch (error) {
            dispatch(getPlanFail());
        }
    };
};

export const postPlanAction = async (body) => {
    if(body.number_question_pass>body.number_question)
    {
        Message.warning("Số câu điều kiện vượt qua không thể lớn hơn tổng số câu hỏi");
        return
    }
    try {
        const result = await axios.post(testPlanURL, body);
        if (result.status === 201) {
            Message.success("Add success");
            return { success: true };
        }
    } catch (error) {
        return { success: false };
    }
};

export const updateStatusAction = async (body, id) => {
    try {
        const response = await axios.post(`${testPlanURL}/${id}`, body);
        if (response.status === 200) {
            Message.success("Update status plan success");
        }
    } catch (error) {
        Message.error("Update status user false");
    }
};

export const updateTestPlan = async (body, id) => {
    if(body.number_question_pass>body.number_question)
    {
        Message.warning("Số câu điều kiện vượt qua không thể lớn hơn tổng số câu hỏi");
        return
    }
    try {
        const response = await axios.put(`${testPlanURL}/${id}`, body);
        if (response.status === 200) {
            Message.success("Update plan success");
            return { success: true };
        }
    } catch (error) {
        Message.error("Update plan false");
        return { success: false };
    }
};
export const getPlanActionPublic = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(testPlanURLPublic);
            if (response.status === 200) {
                dispatch(getPlanPublic(response));
            }
        } catch (error) {
            dispatch(getPlanFail());
        }
    };
}