import { checkUserExistHistory } from "../../../../constants/backend_url";
import axios from 'axios';

export const Service = {
    handleCheckUserExistHistory
};

function handleCheckUserExistHistory(data){
    return axios.post(checkUserExistHistory,data)
}
