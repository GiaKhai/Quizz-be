import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResultAction } from "../actions/result.action";
import { MethodCommon } from "../common/MethodCommon";
import { INFO_USER, NO_PERMISSION } from "../common/parameters";
import ResusltMe from "../js/page/ResultMe";

const YourResult = () => {
    let data_user = MethodCommon.getLocalStorage(INFO_USER);
    let user_role = data_user.role;
    const dispatch = useDispatch();
    const resultList = useSelector((state) => state.resultReducers.userList);
    const list = resultList?.filter((item) => item.user_id === data_user.id);

    useEffect(() => {
        dispatch(getResultAction());
    }, [dispatch]);

    return (
        <div>
            {user_role === "User" ? (
                <ResusltMe list={list} />
            ) : (
                `${NO_PERMISSION}`
            )}
        </div>
    );
};
export default YourResult;
