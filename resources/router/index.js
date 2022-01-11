import React from "react";
import { getCookie } from "../utils/getCookie";
import Authed from "./auth";
import Public from "./public";

const Routes = () => {
    // const isLoggedIn = Boolean(getCookie("XSRF-TOKEN"));
    // return isLoggedIn ? <Authed /> : <Public />;
    // return <Authed />;
    return <Public />;
};

export default Routes;
