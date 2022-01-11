import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanAction, updateStatusAction } from "../actions/testPlan.action";
import TestPlan from "../js/page/TestPlan";
import { MethodCommon } from '../common/MethodCommon'
import {INFO_USER,NO_PERMISSION} from '../common/parameters'

const TestPlanContainer = () => {
    let data_user =MethodCommon.getLocalStorage(INFO_USER)
    let user_role=data_user.role
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

    return (
        <div>
            {user_role ==='Admin' ? <TestPlan planList={planList} updateStatus={updateStatus} /> :`${NO_PERMISSION}`}
        </div>
    );
};
export default TestPlanContainer;
