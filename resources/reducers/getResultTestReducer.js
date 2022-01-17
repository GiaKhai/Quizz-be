import { resultTest } from "../constants/resultTest";

const initialState = {
    resultTest:{
        correct: 0, 
        totalQuestion:0, 
        resultTest: false,
        isVisibleModal:false,
    }
};

const resultTestReducers = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case resultTest.GET_RESULT_TEST:
            return {
                ...state,
                resultTest: data,
            };
        default:
            return state;
    }
};

export default resultTestReducers;
