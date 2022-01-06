import { questionConstants } from "../constants/question.contants";

const initialState = {
    questionList: [],
};

const questionReducers = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case questionConstants.GET_QUESTION_SUCCESS:
            return {
                ...state,
                questionList: data.data,
            };

        case questionConstants.GET_QUESTION_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default questionReducers;
