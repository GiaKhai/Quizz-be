import { resultTest } from "../constants/resultTest";
export const getResultTestUer = (data) => {
    return {
        type: resultTest.GET_RESULT_TEST,
        data,
    };
};