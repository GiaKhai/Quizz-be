import React,{useEffect} from "react";
import { Form, Input, Row, Col, Modal, Select, DatePicker } from "antd";
const { Option } = Select;
var moment = require('moment'); 
const ModalEditPlan = ({
    form,
    handleSubmit,
    handleCancel,
    isModalVisible,
    testList,
    dataEdit
}) => {
    console.log(testList);
    useEffect(() => { 
        form.setFieldsValue({
            title: dataEdit.title,
            schedule:dataEdit.schedule,
            test_date:moment(moment(dataEdit.test_date).format("YYYY/MM/DD")),
            test_id:dataEdit.test_id

        });
    });
    return (
        <div>
            <Modal
                title="Sửa kế hoạch"
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

export default ModalEditPlan;
