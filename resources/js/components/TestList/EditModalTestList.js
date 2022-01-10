import React,{ useState,useEffect } from "react";
import { Form, Input, Row, Col, Modal, Select, DatePicker } from "antd";
const { Option } = Select;

const EditModalTestList = ({
    form,
    handleSubmit,
    handleCancel,
    isModalVisible,
    dataEdit
    // testList,
}) => {
    const [dataModalEdit,setModalDataEdit]=useState({})
    useEffect(() => { 
        setModalDataEdit(dataEdit)
        form.setFieldsValue({
            title: dataEdit.title,
        });
    })
    return (
        <div>
            <Modal
                title="Sửa bài kiểm tra"
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
                        <Col xs={{ span: 24 }}>
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

export default EditModalTestList;
