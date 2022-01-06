import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanAction, updateStatusAction } from "../actions/testPlan.action";
import TestPlan from "../js/page/TestPlan";

const TestPlanContainer = () => {
    const dispatch = useDispatch();
    const [check, setCheck] = useState(true);
    const planList = useSelector((state) => state.planReducers.planList);

    useEffect(() => {
        dispatch(getPlanAction());
    }, [dispatch, check]);

    const updateStatus = async (checked, id) => {
        console.log(checked, id);
        if (checked === 0) {
            let body = { status: 1 };
            await updateStatusAction(body, id);
            setCheck(!check);
        }
        if (checked === 1) {
            let body = { status: 0 };
            await updateStatusAction(body, id);
            setCheck(!check);
        }
    };

    return <TestPlan planList={planList} updateStatus={updateStatus} />;
};
export default TestPlanContainer;
