import React,{ useState,useEffect } from "react";
import { Form, Input, Row, Col, Modal, Select } from "antd";
const { Option } = Select;

const ModalEditUser = ({ form, handleSubmit, handleCancel, isModalVisible ,dataEdit}) => {

    const [dataModalEdit,setModalDataEdit]=useState({})
    useEffect(() => { 
        setModalDataEdit(dataEdit)
        form.setFieldsValue({
            name: dataEdit.name,
            email: dataEdit.email,
            role: dataEdit.role,
        });
    })
    return (
        <div>
            <Modal
                title="Sửa thông tin người dùng"
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    className="form-modal"
                    wrapperCol={{ span: 20 }}
                    layout="vertical"
                    name="nest-messages"
                >
                    <Row>
                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                name="name"
                                id="name"
                                label="Tên:"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        type: "email",
                                        required: true,
                                        message: "Vui lòng nhập email",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                name="role"
                                label="Quyền:"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn quyền",
                                    },
                                ]}
                            >
                                <Select allowClear>
                                    <Option value="Admin">Admin</Option>
                                    <Option value="User">Người thi</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalEditUser;
