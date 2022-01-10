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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
        dispatch(getListAction());
    }, [dispatch]);
    
    const [form] = useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    //handle show modal
    const showModal = () => {
        setIsModalVisible(true);
    };
   
    //handle cancel modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const columns = [
        {
            title: "STT",
            key: "id",
            align: "center",
            width: 120,
            render: (index, record,stt) =>{
                var index =pageSize*(currentPage-1) + (stt+1)
                return <p>{index}</p>
            }
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

    //handle change when change pagination
    function onChange(currentPageData){
        setCurrentPage(currentPageData.current)
    }
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
            <Table  columns={columns} dataSource={testList}  onChange={(pagination, filters, sorter, currentPageData) =>onChange(pagination)}/>
        </div>
    );
}

export default TestList;
