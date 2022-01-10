import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionAction } from "../actions/question.action";
import QuestionList from "../js/page/QuestionList";

const QuestionContainer = () => {
    const dispatch = useDispatch();
    const questionList = useSelector(
        (state) => state.questionReducers.questionList
    );

    useEffect(() => {
        dispatch(getQuestionAction());
    }, [dispatch]);

    return <QuestionList questionList={questionList} />;
};
export default QuestionContainer;
