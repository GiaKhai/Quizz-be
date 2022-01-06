import { testPlanConstants } from "../constants/testPlan.contants";

const initialState = {
    planList: [],
};

const planReducers = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case testPlanConstants.GET_PLAN_SUCCESS:
            return {
                ...state,
                planList: data.data,
            };

        case testPlanConstants.GET_PLAN_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default planReducers;
