import React from "react";
import HomePage from "../js/page/Homepage";
import UserContainer from "../containers/User";
import QuestionContainer from "../containers/Question";
import TestList from "../js/page/TestList";
import TestPlanContainer from "../containers/TestPlan";
import Login from "../js/page/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LayoutCommon from "../js/components/LayoutCommon/LayoutCommon";
import PrivateRoute from "./PrivateRoute";
import Usertest from "../js/page/UserTest/UserTest";
import Result from "../containers/Result";
import YourResult from "../containers/ResultMe";

const Routerurl = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/login" component={Login}></Route>

                <Route exact path="/">
                    <PrivateRoute>
                        <LayoutCommon component_ui={<HomePage />} />
                    </PrivateRoute>
                </Route>

                <Route exact path="/user">
                    <PrivateRoute>
                        <LayoutCommon component_ui={<UserContainer />} />
                    </PrivateRoute>
                </Route>

                <Route exact path="/test-plan">
                    <PrivateRoute>
                        <LayoutCommon component_ui={<TestPlanContainer />} />
                    </PrivateRoute>
                </Route>

                <Route exact path="/question">
                    <PrivateRoute>
                        <LayoutCommon component_ui={<QuestionContainer />} />
                    </PrivateRoute>
                </Route>

                <Route exact path="/test-list">
                    <PrivateRoute>
                        <LayoutCommon component_ui={<TestList />} />
                    </PrivateRoute>
                </Route>

                <Route exact path="/result-test">
                    <PrivateRoute>
                        <LayoutCommon component_ui={<Result />} />
                    </PrivateRoute>
                </Route>

                <Route exact path="/test-list">
                    <PrivateRoute>
                        <LayoutCommon component_ui={<TestList />} />
                    </PrivateRoute>
                </Route>
                <Route exact path="/result-me">
                    <PrivateRoute>
                        <LayoutCommon component_ui={<YourResult />} />
                    </PrivateRoute>
                </Route>
                <Route exact path="/do_test/:planTest_id">
                    <PrivateRoute>
                        <Usertest />
                    </PrivateRoute>
                </Route>
            </Switch>
        </div>
    );
};

export default Routerurl;
