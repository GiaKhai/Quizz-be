import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../actions/user.action";
import User from "../js/page/User";

const UserContainer = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userReducers.userList);
    useEffect(() => {
        dispatch(getUserAction());
    }, [dispatch]);

    return <User userList={userList} />;
};
export default UserContainer;
