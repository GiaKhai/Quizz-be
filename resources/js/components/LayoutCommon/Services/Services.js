
import axios from 'axios';
import { API_URL } from "../../../../constants/backend_url";
export const Service = {
    authenticatice,
};

/**
 * call api to authenticatice
 * @param {*} model
 * @returns 
 */

function authenticatice(model) {
    return axios.post(`${API_URL}/api/auth/authenticate`,model)
}

