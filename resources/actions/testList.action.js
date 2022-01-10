import axios from "axios";
import { testListURL } from "../constants/backend_url";
import { testListConstants } from "../constants/testList.contants";
import { message as Message } from "antd";
const getListSuccess = (data) => {
    return {
        type: testListConstants.GET_LIST_SUCCESS,
        data,
    };
};

const getListFail = () => {
    return {
        type: testListConstants.GET_LIST_FAIL,
    };
};

export const getListAction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(testListURL);
            if (response.status === 200) {
                dispatch(getListSuccess(response));
            }
        } catch (error) {
            dispatch(getListFail());
        }
    };
};

export const postTestListAction = async (body) => {
    try {
        const result = await axios.post(testListURL, body);
        if (result.status === 201) {
            Message.success("Add success");
            return { success: true };
        }
    } catch (error) {
        return { success: false };
    }
};

export const updateTestListAction = async (id,body) => {
    try {
        const result = await axios.put(`${testListURL}/${id}`, body);
        if (result.status === 200) {
            Message.success("Update success");
            return { success: true };
        }
    } catch (error) {
        return { success: false };
    }
};