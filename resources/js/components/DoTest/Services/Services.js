import { checkUserExistHistory } from "../../../../constants/backend_url";
import axios from 'axios';

export const Service = {
    handleCheckUserExistHistory
};

/**
 * API to check user exist in history by plan id
 * @param {*} data
 * @returns 
 */
function handleCheckUserExistHistory(data){
    return axios.post(checkUserExistHistory,data)
}
