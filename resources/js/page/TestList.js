import React, { useState,useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Table, Switch, message as Message ,Modal} from "antd";
import Addtestlist from "../../containers/AddTestList";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getListAction } from "../../actions/testList.action";
import { testListURL } from "../../constants/backend_url";
import Edittestlist from "../../containers/EditTestList";
const { confirm } = Modal;
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
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [dataEdit,setDataEdit]=useState({})

    //handle show modal Add
    const showModal = () => {
        setIsModalVisible(true);
    };
    //handle cancel modal Add
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //handle show modal Edit
    const showModalEdit = (record) => {
        setIsModalVisibleEdit(true);
        setDataEdit(record)
    };
    //handle cancel modal Edit
    const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
    };
    
    const handleDeleteData=(id)=>{
        confirm({
            content:"Bạn muốn xóa",
            onOk() {
                axios.delete( `${testListURL}/${id}`).then((res)=>{
                     if (res.status === 200) {
                        Message.success("Xóa dữ liệu thành công");
                        dispatch(getListAction());
                    }
                })   
            },
            onCancel() {
            },
            okText:"Có",
            cancelText:"Không"
        })
    }

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
            title: "Mã bài kiểm tra",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 200,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                return (
                    <div>
                        <Button
                            // onClick={async () => {
                            //     const res = await axios.delete(
                            //         `${testListURL}/${record.id}`
                            //     );
                            //     if (res.status === 200) {
                            //         Message.success("Xóa thành công");
                            //         dispatch(getListAction());
                            //     }
                            // }}
                            onClick={()=>handleDeleteData(record.id)}
                            danger
                        >
                        Xóa
                        </Button>
                        <Button
                         onClick={()=>showModalEdit(record)}
                        >
                            Sửa
                        </Button>
                    </div>
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
            <Edittestlist
                setIsModalVisible={setIsModalVisibleEdit}
                isModalVisible={isModalVisibleEdit}
                handleCancel={handleCancelEdit}
                form={form}
                dataEdit={dataEdit}
            />
            
            <Table  columns={columns} dataSource={testList}  onChange={(pagination, filters, sorter, currentPageData) =>onChange(pagination)}/>
        </div>
    );
}

export default TestList;
