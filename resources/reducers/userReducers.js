import { userConstants } from "../constants/user.constants";

const initialState = {
    userList: [],
};

const userReducers = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case userConstants.GET_USER_SUCCESS:
            return {
                ...state,
                userList: data.data,
            };

        case userConstants.GET_USER_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default userReducers;
