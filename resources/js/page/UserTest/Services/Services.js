import { resultTest } from "../../../../constants/backend_url";
import axios from 'axios';

export const Service = {
    checkResultTest
};
/**
 * call api to check Result Test of user
 * @param {*} data
 * @returns 
 */
function checkResultTest(data){
    return axios.post(resultTest,data)
}
