import axios from "axios";
import { API_URL } from "../../../../constants/backend_url";

export const Service = {
    loadingQuestion,
};
/**
 * call api to show list question
 * @param {*} body 
 * @returns 
*/
function loadingQuestion(model) {
    return axios.post(`${API_URL}/api/question`,model)
}