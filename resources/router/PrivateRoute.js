import React from "react";
import { useHistory } from "react-router-dom";
import { MethodCommon } from '../common/MethodCommon'
const PrivateRoute = ({children}) => {
    let history = useHistory();
    var isAuthencate= MethodCommon.check_authenticate()
    return (
        <div>
            { isAuthencate === true ? (children):  history.push("/login")}
        </div>
        
    )
};

export default PrivateRoute;
