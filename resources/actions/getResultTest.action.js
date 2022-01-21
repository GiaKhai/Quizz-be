import { resultTest } from "../constants/resultTest";
/**
 * Create Result Test of a User
 * @param {*} data
 * @returns 
 */
export const getResultTestUer = (data) => {
    return {
        type: resultTest.GET_RESULT_TEST,
        data,
    };
};