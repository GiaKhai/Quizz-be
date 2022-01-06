import React from "react";
import { Result, Button } from "antd";

import { useHistory } from "react-router-dom";

const PageNotFound = () => {
    let history = useHistory();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Page Not Found"
            extra={
                <Button type="primary" onClick={() => history.replace("/")}>
                    Back Home
                </Button>
            }
        />
    );
};

export default PageNotFound;
