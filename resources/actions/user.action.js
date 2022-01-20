import axios from "axios";
import { userURL } from "../constants/backend_url";
import { userConstants } from "../constants/user.constants";
import { message as Message } from "antd";

const getUserSuccess = (data) => {
    return {
        type: userConstants.GET_USER_SUCCESS,
        data,
    };
};

const getUserFail = () => {
    return {
        type: userConstants.GET_USER_FAIL,
    };
};

export const getUserAction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(userURL);
            if (response.status === 200) {
                dispatch(getUserSuccess(response));
            }
        } catch (error) {
            dispatch(getUserFail());
        }
    };
};

export const postUserAction = async (body) => {
    try {
        const result = await axios.post(userURL, body);
        if (result.status === 201) {
            Message.success("Add success");
            return { success: true };
        }
    } catch (error) {
        return { success: false };
    }
};

/**
 * Update user
 * @param {*} body 
 * @param {*} id 
 * @returns 
 */
export const updateUserAction = async (body,id) => {
    console.log("body:",body)
    console.log("id:",id)
    try {
        const result = await axios.put(`${userURL}/${id}`, body);
        console.log("result:",result)
        if (result.status === 200) {
            Message.success("Edit success");
            return { success: true };
        }
    } catch (error) {
        return { success: false };
    }
};

