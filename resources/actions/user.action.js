import axios from "axios";
import { userURL } from "../constants/backend_url";
import { userConstants } from "../constants/user.constants";
import { message as Message } from "antd";

/**
 * get user successs
 */
const getUserSuccess = (data) => {
    return {
        type: userConstants.GET_USER_SUCCESS,
        data,
    };
};

/**
 * get user fail
 */
const getUserFail = () => {
    return {
        type: userConstants.GET_USER_FAIL,
    };
};

/**
 * get list user
 */
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

/**
 * Create User
 * @param {*} body 
 * @returns 
 */
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
    try {
        const result = await axios.put(`${userURL}/${id}`, body);
        if (result.status === 200) {
            Message.success("Edit success");
            return { success: true };
        }
    } catch (error) {
        return { success: false };
    }
};

