import React,{useEffect} from "react";
import { Form, Input, Row, Col, Modal, Select, DatePicker ,InputNumber} from "antd";
import './index.css'
const { Option } = Select;
var moment = require('moment'); 
const ModalEditPlan = ({
    form,
    handleSubmit,
    handleCancel,
    isModalVisible,
    dataEdit
}) => {
    useEffect(() => { 
        form.setFieldsValue({
            titleEdit: dataEdit.title,
            scheduleEdit:dataEdit.schedule,
            test_dateEdit:moment(moment(dataEdit.test_date).format("YYYY/MM/DD")),
            number_questionEdit:dataEdit.number_question,
            number_question_passEdit:dataEdit.number_question_pass,
        });
    });
    return (
        <div>
            <Modal
                title="Sửa kế hoạch"
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <button className="plan_btnCancel" key="back" onClick={handleCancel}>Hủy</button>,
                    <button className="plan_btnSubmit" key="submit"  onClick={handleSubmit}>Sửa</button>,
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
                                name="titleEdit"
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
                                name="scheduleEdit"
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
                                label="Ngày kiểm tra"
                                name="test_dateEdit"
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
                                name="number_questionEdit"
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
                                name="number_question_passEdit"
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

export default ModalEditPlan;
