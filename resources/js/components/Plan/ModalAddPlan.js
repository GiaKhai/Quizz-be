import React from "react";
import { Form, Input, Row, Col, Modal, Select, DatePicker } from "antd";
const { Option } = Select;

const ModalAddPlan = ({
    form,
    handleSubmit,
    handleCancel,
    isModalVisible,
    testList,
}) => {
    console.log(testList);
    return (
        <div>
            <Modal
                title="Thêm Kế Hoạch"
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
                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                name="schedule"
                                label="Lịch trình"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập lịch trình",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                name="status"
                                label="Trạng thái"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn trạng thái",
                                    },
                                ]}
                            >
                                <Select allowClear>
                                    <Option value="0">Đóng</Option>
                                    <Option value="1">Mở</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                label="Ngày kiểm tra"
                                name="test_date"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input date test",
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                label="Mã bài kiểm tra"
                                name="test_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select mã",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: 162 }}
                                    onSelect={onselect}
                                >
                                    {testList?.length > 0 &&
                                        testList?.map((list) => {
                                            return (
                                                <Option
                                                    value={list.id}
                                                    key={list.id}
                                                >
                                                    {list.id}
                                                </Option>
                                            );
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalAddPlan;
