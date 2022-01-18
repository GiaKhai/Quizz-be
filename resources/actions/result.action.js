import axios from "axios";
import { planResultTest } from "../constants/backend_url";
import { result } from "../constants/result.contants";
import { message as Message } from "antd";

const getResultSuccess = (data) => {
    return {
        type: result.GET_RESULT,
        data,
    };
};

export const getResultAction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(planResultTest);
            if (response.status === 200) {
                dispatch(getResultSuccess(response));
            }
        } catch (error) {}
    };
};

export const postPlanResultTest = async (body) => {
    try {
        const result = await axios.post(planResultTest, body);
        if (result.status === 201) {
            Message.success("Add success");
            return { success: true };
        }
    } catch (error) {
        return { success: false };
    }
};
