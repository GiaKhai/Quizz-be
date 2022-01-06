import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Table, Switch, message as Message } from "antd";
import { getPlanAction } from "../../actions/testPlan.action";
import { testPlanURL } from "../../constants/backend_url";
import AddPlan from "../../containers/AddPlan";
import { useForm } from "antd/lib/form/Form";

function TestPlan({ planList, updateStatus }) {
    const [form] = useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 120,
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            align: "center",
            width: 200,
        },
        {
            title: "Lịch trình",
            dataIndex: "schedule",
            key: "schedule",
            align: "center",
        },
        {
            title: "Ngày kiểm tra",
            dataIndex: "test_date",
            key: "test_date",
            align: "center",
        },
        {
            title: "Mã bài kiểm tra",
            dataIndex: "test_id",
            key: "test_id",
            align: "center",
            width: 130,
        },
        {
            key: "status",
            title: "Trạng thái",
            dataIndex: "status",
            align: "center",
            render: (value, row, index) => {
                return (
                    <Switch
                        checkedChildren="Mở"
                        unCheckedChildren="Đóng"
                        checked={value === 1 ? true : false}
                        onChange={() => updateStatus(value, row.id)}
                    />
                );
            },
            width: 130,
        },

        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                return (
                    <Button
                        onClick={async () => {
                            const res = await axios.delete(
                                `${testPlanURL}/${record.id}`
                            );
                            if (res.status === 200) {
                                Message.success("Xóa thành công");
                                dispatch(getPlanAction());
                            }
                        }}
                        danger
                    >
                        Xóa
                    </Button>
                );
            },
            width: 150,
            align: "center",
        },
    ];
    return (
        <div className="content-page">
            <div className="title">Kế hoạch kiểm tra</div>
            <Button
                className="add-user"
                type="primary"
                shape="round"
                icon={<UserAddOutlined />}
                size="large"
                onClick={showModal}
            >
                Thêm kế hoạch
            </Button>

            <AddPlan
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                form={form}
            />

            <Table columns={columns} dataSource={planList} />
        </div>
    );
}

export default TestPlan;
