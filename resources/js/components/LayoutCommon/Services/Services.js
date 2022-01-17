// import { API_URL } from '../../../conf';
import axios from 'axios';
export const Service = {
    authenticatice,
    // handleRefreshToken
};
//call api to authenticatice
function authenticatice(model) {
    return axios.post(`http://127.0.0.1:8000/api/auth/authenticate`,model)
}
//call api to handle refresh token when access token expired
// function handleRefreshToken(model){
//     return axios.post(`${API_URL}/refresh_token`,model)
// }
