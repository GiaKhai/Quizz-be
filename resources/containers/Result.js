import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResultAction } from "../actions/result.action";
import ResusltTestByPlan from "../js/page/ResultTestByPlan";
import { MethodCommon } from "../common/MethodCommon";
import { INFO_USER, NO_PERMISSION } from "../common/parameters";

const Result = () => {
    let data_user = MethodCommon.getLocalStorage(INFO_USER);
    let user_role = data_user.role;
    const dispatch = useDispatch();
    const resultList = useSelector((state) => state.resultReducers.userList);

    useEffect(() => {
        dispatch(getResultAction());
    }, [dispatch]);

    return (
        <div>
            {user_role === "Admin" ? (
                <ResusltTestByPlan resultList={resultList} />
            ) : (
                `${NO_PERMISSION}`
            )}
        </div>
    );
};
export default Result;
