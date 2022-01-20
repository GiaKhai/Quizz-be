import { result } from "../constants/result.contants";

const initialState = {
    resultList: [],
};

const resultReducers = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case result.GET_RESULT:
            return {
                ...state,
                userList: data.data,
            };
        default:
            return state;
    }
};

export default resultReducers;
