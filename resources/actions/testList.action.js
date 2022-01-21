import axios from "axios";
import { testListURL } from "../constants/backend_url";
import { testListConstants } from "../constants/testList.contants";
import { message as Message } from "antd";
/**
 * Get List Success
 * @param {*} data 
 * @returns 
 */
const getListSuccess = (data) => {
    return {
        type: testListConstants.GET_LIST_SUCCESS,
        data,
    };
};

/**
 * Get List Fail
 */
const getListFail = () => {
    return {
        type: testListConstants.GET_LIST_FAIL,
    };
};

/**
 * Get list
 */
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

/**
 * Create a test list
 * @param {*} body 
 * @returns 
 */
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

/**
 * Update a test list
 * @param {*} body 
 * @param {*} id 
 * @returns 
 */
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