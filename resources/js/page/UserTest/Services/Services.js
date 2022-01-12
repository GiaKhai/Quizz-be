import { resultTest } from "../../../../constants/backend_url";
import axios from 'axios';

export const Service = {
    checkResultTest
};

function checkResultTest(data){
    return axios.post(resultTest,data)
}
