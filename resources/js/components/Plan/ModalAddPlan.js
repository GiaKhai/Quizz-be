import React from "react";
import { Form, Input, Row, Col, Modal, Select, DatePicker,InputNumber } from "antd";
import './index.css'
const { Option } = Select;
const ModalAddPlan = ({
    form,
    handleSubmit,
    handleCancel,
    isModalVisible,
}) => {
    return (
        <div>
            <Modal
                title="Thêm Kế Hoạch"
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <button className="plan_btnCancel" key="back" onClick={handleCancel}>Hủy</button>,
                    <button className="plan_btnSubmit" key="submit"  onClick={handleSubmit}>Thêm</button>,
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
                                <Input className="input_title"/>
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
                                <Input className="input_schedule"/>
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
                                <Select allowClear className="select_status">
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
                                <DatePicker className="input_DatePicker"/>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                label="Số câu hỏi"
                                name="number_question"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input number question",
                                    },
                                ]}
                            >
                                 <InputNumber className="input_numberQuestion" min={0} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }}>
                            <Form.Item
                                label="Số câu điều kiện vượt qua"
                                name="number_question_pass"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input number question",
                                    },
                                ]}
                            >
                                 <InputNumber className="input_numberQuestion" min={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalAddPlan;
