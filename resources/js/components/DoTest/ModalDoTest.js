import React from "react";
import { Form, Input, Row, Col, Modal, Select, Button } from "antd";
const { Option } = Select;

const ModalDoTest = ({ handleCancel, isModalVisible, handleSubmit, form }) => {
    return (
        <div>
            <Modal
                title="Kế hoạch thi"
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Vào thi
                    </Button>,
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
                        <Col xs={{ span: 24 }}>
                            <Form.Item
                                name="planTest_id"
                                id="planTest_id"
                                label="Nhập mã kế hoạch"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mã kế hoạch",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalDoTest;
