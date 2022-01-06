import React from "react";
import ReactDOM from "react-dom";

import { Switch, Route } from "react-router-dom";
import Login from "../js/page/Login";
import PageNotFound from "../js/page/NotFound";

const Public = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                {/* <Route path="*">
                    <PageNotFound />
                </Route> */}
            </Switch>
        </>
    );
};

export default Public;
