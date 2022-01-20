import React, { useState ,useEffect} from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Table, Switch, message as Message,Modal } from "antd";
import { getPlanAction,getPlanActionPublic } from "../../actions/testPlan.action";
import { testPlanURL } from "../../constants/backend_url";
import AddPlan from "../../containers/AddPlan";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import EditPlan from "../../containers/EditPlan";
const { confirm } = Modal;
function TestPlan({ planList, updateStatus }) {
    const dispatch = useDispatch();
    const testPlan = useSelector((state) => state.planReducers.planList);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [form] = useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataEdit,setDataEdit]=useState({})
    useEffect(() => {
        dispatch(getPlanAction());
    }, [dispatch]);
    
    //show modal add
    const showModal = () => {
        setIsModalVisible(true);
    };
    //cancel modal add
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
    

    //handle delete data
    const handleDeleteData=(id)=>{
        confirm({
            content:"Bạn muốn xóa?",
            onOk() {
                axios.delete(`${testPlanURL}/${id}`).then((res)=>{
                    if (res.status === 200) {
                        Message.success("Xóa thành công");
                        dispatch(getPlanAction());
                        dispatch(getPlanActionPublic()); 
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
            dataIndex: "id",
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
            title: "Tổng số câu hỏi",
            dataIndex: "number_question",
            key: "number_question",
            align: "center",
        },
        {
            title: "Số câu điều kiện vượt qua",
            dataIndex: "number_question_pass",
            key: "number_question_pass",
            align: "center",
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
                    <div>
                       <Button
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
     function onChangePagination(currentPageData){
        setCurrentPage(currentPageData.current)
    }
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
            <EditPlan
                setIsModalVisible={setIsModalVisibleEdit}
                isModalVisible={isModalVisibleEdit}
                handleCancel={handleCancelEdit}
                form={form}
                dataEdit={dataEdit}
            />

            <Table columns={columns} dataSource={testPlan} onChange={(pagination, filters, sorter, currentPageData) =>onChangePagination(pagination)}/>
        </div>
    );
}

export default TestPlan;
