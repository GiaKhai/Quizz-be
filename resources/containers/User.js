import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../actions/user.action";
import User from "../js/page/User";
import { MethodCommon } from '../common/MethodCommon'
import {INFO_USER,NO_PERMISSION} from '../common/parameters'
const UserContainer = () => {
    let data_user =MethodCommon.getLocalStorage(INFO_USER)
    let user_role=data_user.role
    
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userReducers.userList);
    useEffect(() => {
        dispatch(getUserAction());
    }, [dispatch]);
    
    return (
        <div>
            {user_role ==='Admin' ? <User userList={userList} /> :`${NO_PERMISSION}`}
        </div>
    );
};
export default UserContainer;
