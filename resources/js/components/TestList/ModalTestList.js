import React from "react";
import { Form, Input, Row, Col, Modal, Select, DatePicker } from "antd";
const { Option } = Select;

const ModalAddTestList = ({
    form,
    handleSubmit,
    handleCancel,
    isModalVisible,
    // testList,
}) => {

    return (
        <div>
            <Modal
                title="Thêm bài kiểm tra"
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
                                name="title"
                                id="title"
                                label="Tiêu đề:"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tiêu đề",
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

export default ModalAddTestList;
