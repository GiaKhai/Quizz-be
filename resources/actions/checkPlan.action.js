import axios from "axios";
import { checkPlanURL } from "../constants/backend_url";
import { testPlanConstants } from "../constants/testPlan.contants";
import { message as Message } from "antd";

/**
 * check status of a plan
 * @param {*} body, id
 * @returns 
 */
export const checkPlan = async (body, id) => {
    try {
        const response = await axios.post(checkPlanURL, body);
        var result = response.data
        if (result.status === true) {
            Message.success("Vào thi thành công");
            return { success: true };
        }else{
            Message.warning("Kế hoạch chưa được công khai");
            return { success: false };
        }
    } catch (error) {
        Message.error("Check plan false");
        return { success: false };
    }
};
