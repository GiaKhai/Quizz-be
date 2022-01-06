import axios from "axios";
import { testListURL } from "../constants/backend_url";
import { testListConstants } from "../constants/testList.contants";

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
