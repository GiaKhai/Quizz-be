import { testListConstants } from "../constants/testList.contants";

const initialState = {
    testList: [],
};

const testListReducers = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case testListConstants.GET_LIST_SUCCESS:
            return {
                ...state,
                testList: data.data,
            };

        case testListConstants.GET_LIST_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default testListReducers;
