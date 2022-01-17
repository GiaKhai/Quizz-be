import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionAction } from "../actions/question.action";
import QuestionList from "../js/page/QuestionList/QuestionList";
import { MethodCommon } from '../common/MethodCommon'
import {INFO_USER,NO_PERMISSION} from '../common/parameters'

const QuestionContainer = () => {
    let data_user =MethodCommon.getLocalStorage(INFO_USER)
    let user_role=data_user.role
    const dispatch = useDispatch();
    const questionList = useSelector(
        (state) => state.questionReducers.questionList
    );

    useEffect(() => {
        dispatch(getQuestionAction());
    }, [dispatch]);

    return (
        <div>
            {user_role ==='Admin' ? <QuestionList questionList={questionList} /> :`${NO_PERMISSION}`}
        </div>
    );
};
export default QuestionContainer;
