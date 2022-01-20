import React from "react";
import { Form, Input, Row, Col, Modal, Select } from "antd";
const { Option } = Select;
import './index.css'
const ModalAddUser = ({ form, handleSubmit, handleCancel, isModalVisible }) => {
    return (
        <div>
            <Modal
                title="Thêm Người Dùng"
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <button className="user_btnCancel" key="back" onClick={handleCancel}>Hủy</button>,
                    <button className="user_btnSubmit" key="submit"  onClick={handleSubmit}>Sửa</button>,
                  ]}
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
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mật khẩu!",
                                    },
                                    {
                                        validator: (_, value) => {
                                            var regex = new RegExp(
                                                /^(?=.*[0-9])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                                            );
                                            if (value) {
                                                if (value.match(regex)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    "Tối thiểu 8 ký tự, ít nhất 1 chữ viết hoa, 1 chữ thường, 1 số"
                                                );
                                            }

                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                name="password2"
                                label="Xác nhận mật khẩu"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập lại mật khẩu",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "Mật khẩu bạn đã nhập không khớp!"
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
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

export default ModalAddUser;
