import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";

const ResusltMe = ({ list }) => {
    const columns = [
        {
            key: "stt",
            title: "STT",
            dataIndex: "stt",
            align: "center",
            width: 100,
            render: (_, __, index) => index + 1,
        },
        {
            title: "Mã kì thi",
            dataIndex: "plan_id",
            key: "plan_id",
            align: "center",
        },
        {
            title: "Mã người thi",
            dataIndex: "user_id",
            key: "user_id",
            align: "center",
        },
        {
            title: "Số câu đúng",
            dataIndex: "number_correct",
            key: "number_correct",
            align: "center",
        },
        {
            title: "Tổng số câu hỏi",
            dataIndex: "total_question",
            key: "total_question",
            align: "center",
        },
        {
            title: "Kết quả",
            dataIndex: "result_test",
            key: "result_test",
            align: "center",
            render: (_, record) => {
                let result;
                if (record.result_test === "true") {
                    result = "Đậu";
                } else if (record.result_test === "false") {
                    result = "Rớt";
                } else {
                    result = "Lỗi";
                }
                return <div>{result}</div>;
            },
        },
    ];
    return (
        <div className="content-page">
            <div className="title">Kết quả của tôi</div>
            <Table columns={columns} dataSource={list} />
        </div>
    );
};

export default ResusltMe;
