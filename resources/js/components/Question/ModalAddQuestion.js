import React,{ useState ,useEffect}  from 'react';
import { Form, Input, Row, Col, Modal, Select, DatePicker,Button} from "antd";
import Tableanswerchoice from './TableAnswerChoice';
import Selectcorrectanswer from './SelectCorrectAnswer';
import { getInfoQuestion } from "../../../actions/question.action";
import { useDispatch, useSelector } from "react-redux";
import { init_info_question } from './initModel';
import Selectmultiple from './SelectMultiple';
const { TextArea } = Input;

const Modaladdquestion = ({
    handleSubmit,
    handleCancel,
    isModalVisible,
}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const info_question = useSelector((state) => state.inFoQuestionReducer.info_question)
   
    //handle change content of question
    function handleChangeContentQuestion(e){ 
        let new_info={...info_question}
        new_info.content_question=e.target.value
        dispatch(getInfoQuestion(new_info))
    }

    //handle submit data
    function handleOK(){
        form.resetFields();
        handleSubmit(info_question)
    }
    useEffect(() => { 
        form.setFieldsValue({
            options_question: info_question.content_question,
            isMutiple:info_question.isMultiple,
            options_question:info_question.answer_choices,
            answer_correct:info_question.answer_correct, 
        });
    });
    return (
        <Modal
            title="Thêm câu hỏi"
            visible={isModalVisible}
            onOk={handleOK}
            onCancel={handleCancel}
            footer={[
                <button className="inFQ_btnCancel" key="back" onClick={handleCancel}>Hủy</button>,
                <button className="inFQ_btnSubmit" key="submit" type="primary" onClick={handleOK}>Thêm</button>,
              ]}
        >
            {/* <div className="content_question">
                <p>Nội dung câu hỏi</p>
                <TextArea
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    onChange={handleChangeContentQuestion}
                />
            </div>
            <div className="options_question">
                <p>Lựa chọn</p>
                <Tableanswerchoice/>
            </div>
            <div className="options_question">
                <p>Cho phép chọn nhiều đáp án đúng ?</p>
                <Selectmultiple/>
            </div>
            <div className="options_question">
                <p>Đáp án</p>
                <Selectcorrectanswer/>
            </div> */}
             <Form
                    form={form}
                    className="form-modal"
                    layout="vertical"
                    name="basic"
                >
                    <Row>
                        <Col xs={{ span: 24 }}>
                            <Form.Item
                                name="content_question"
                                id="content_question"
                                label="Nội dung câu hỏi"
                            >
                                <TextArea
                                        autoSize={{ minRows: 1, maxRows: 5 }}
                                        onChange={handleChangeContentQuestion}
                                />
                            </Form.Item>

                            <Form.Item
                                name="options_question"
                                id="options_question"
                                label="Lựa chọn"
                            >
                                <Tableanswerchoice/>
                            </Form.Item>
                            <Form.Item
                                name="isMutiple"
                                id="isMutiple"
                                label="Cho phép chọn nhiều đáp án đúng ?"
                            >
                                <Selectmultiple/>
                            </Form.Item>
                            <Form.Item
                                name="answer_correct"
                                id="answer_correct"
                                label="Đáp án"
                            >
                                 <Selectcorrectanswer/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
        </Modal>
    );
};
export default Modaladdquestion;
