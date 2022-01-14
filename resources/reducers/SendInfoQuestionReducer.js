import { questionConstants } from "../constants/question.contants";

const dataSourceInit = [
    {
        key: '1',
        content: '',
    },
    {
        key: '2',
        content: '',
    },
    {
        key: '3',
        content: '',
    },
    {
        key: '4',
        content: '',
    },
];
const initialState = {
    info_question: {
        content_question:'',
        answer_choices:dataSourceInit,
        isMultiple:0,
        answer_correct:[]
    },
};

const SendInfoQuestionReducer = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case questionConstants.GET_INFO_QUESTION:
            return {
                ...state,
                info_question: data,
        };
        default:
            return state;
    }
};

export default SendInfoQuestionReducer;
