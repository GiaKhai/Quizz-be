import React, { useState, useEffect } from "react";
import { UserAddOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Button, Table, message as Message } from "antd";
import { useDispatch } from "react-redux";
import AddUser from "../../containers/AddUser";
import { useForm } from "antd/lib/form/Form";
import { userURL } from "../../constants/backend_url";
import { getUserAction } from "../../actions/user.action";
import EditUser from "../../containers/EditUser";

const { confirm } = Modal;

function showConfirm(id) {
    confirm({
        title: "Bạn có muốn xóa?",
        icon: <ExclamationCircleOutlined />,
        async onOk() {
            const res = await axios.delete(`${userURL}/${id}`);
            if (res.status === 200) {
                Message.success("Xóa thành công");
                dispatch(getUserAction());
            }
        },
        onCancel() {
            console.log("Cancel");
        },
        okText:"Có",
        cancelText:"Không"
    });
}



const User = ({ userList }) => {
    const [form] = useForm();
    const dispatch = useDispatch();

    const [data, setData] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [dataEdit,setDataEdit]=useState({})
    useEffect(() => {
        setData(userList);
    }, [userList]);

    const showModal = () => {
        setIsModalVisible(true);
    };

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
    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 120,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Quyền",
            dataIndex: "role",
            key: "role",
            align: "center",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                return (
                    <div>
                        <Button danger onClick={() => showConfirm(record.id)}>
                            Xóa
                        </Button>
                        <Button onClick={()=>showModalEdit(record)} >
                            Sửa
                        </Button>
                    </div>
                   
                    
                );
            },
            align: "center",
            width: 150,
        },
    ];
    return (
        <div className="content-page">
            <div className="title">Quản lí người dùng</div>
            <Button
                className="add-user"
                type="primary"
                shape="round"
                icon={<UserAddOutlined />}
                size="large"
                onClick={showModal}
            >
                Thêm người dùng
            </Button>
            <AddUser
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                form={form}
            />
            <EditUser
                setIsModalVisible={setIsModalVisibleEdit}
                isModalVisible={isModalVisibleEdit}
                handleCancel={handleCancelEdit}
                form={form}
                dataEdit={dataEdit}
            />
            

            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default User;
