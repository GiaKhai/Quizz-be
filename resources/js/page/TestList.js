import React from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";

function TestList() {
    return (
        <div className="content-page">
            <div className="title">Danh sách bài kiểm tra</div>
            <Button
                className="add-user"
                type="primary"
                shape="round"
                icon={<UserAddOutlined />}
                size="large"
                // onClick={showModal}
            >
                Thêm bài kiểm tra
            </Button>
        </div>
    );
}

export default TestList;
