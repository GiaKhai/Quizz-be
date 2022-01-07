import React, { useState,useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Table, Switch, message as Message } from "antd";
import Addtestlist from "../../containers/AddTestList";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getListAction } from "../../actions/testList.action";
import { testListURL } from "../../constants/backend_url";
function TestList({}) {
    const dispatch = useDispatch();
    const testList = useSelector((state) => state.testListReducers.testList);
    useEffect(() => {
        dispatch(getListAction());
    }, [dispatch]);
    
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
            // render: (index, record,stt) =>{
            //     return <p>{stt+1}</p>
            // }
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            align: "center",
            width: 200,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                return (
                    <Button
                        onClick={async () => {
                            const res = await axios.delete(
                                `${testListURL}/${record.id}`
                            );
                            if (res.status === 200) {
                                Message.success("Xóa thành công");
                                dispatch(getListAction());
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
    function onChange(){
        console.log("xx")
    }
    console.log("TestList:",testList)
    return (
        <div className="content-page">
            <div className="title">Danh sách bài kiểm tra</div>
            <Button
                className="add-user"
                type="primary"
                shape="round"
                icon={<UserAddOutlined />}
                size="large"
                onClick={showModal}
            >
                Thêm bài kiểm tra
            </Button>
            <Addtestlist
                 setIsModalVisible={setIsModalVisible}
                 isModalVisible={isModalVisible}
                 handleCancel={handleCancel}
                 form={form}
            />
            <Table  columns={columns} dataSource={testList}  onChange={onChange}/>
        </div>
    );
}

export default TestList;
