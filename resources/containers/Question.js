import React from "react";
import QuestionList from "../js/page/QuestionList/QuestionList";
import { MethodCommon } from '../common/MethodCommon'
import {INFO_USER,NO_PERMISSION} from '../common/parameters'

const QuestionContainer = () => {
    let data_user =MethodCommon.getLocalStorage(INFO_USER)
    let user_role=data_user.role
    return (
        <div>
            {user_role ==='Admin' ? <QuestionList /> :`${NO_PERMISSION}`}
        </div>
    );
};
export default QuestionContainer;
