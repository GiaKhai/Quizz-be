import axios from "axios";
import { testPlanURL } from "../constants/backend_url";
import { testPlanConstants } from "../constants/testPlan.contants";
import { message as Message } from "antd";

const getPlanSuccess = (data) => {
    return {
        type: testPlanConstants.GET_PLAN_SUCCESS,
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
