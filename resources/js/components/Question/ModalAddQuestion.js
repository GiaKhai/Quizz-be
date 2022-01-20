import React,{ useState}  from 'react';
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
    form,
}) => {
    const dispatch = useDispatch();
    const info_question = useSelector((state) => state.inFoQuestionReducer.info_question)
    const [statusMultiple ,setStatusMultiple] =useState(info_question.isMultiple)
    const [dataSubmit,setDataSubmit]=useState({...info_question})
    //handle change content of question
    function handleChangeContentQuestion(e){ 
        let new_info={...info_question}
        new_info.content_question=e.target.value
        dispatch(getInfoQuestion(new_info))
    }

    //handle submit data
    function handleOK(){
        handleSubmit(dataSubmit)
    }
    //handle close modal
    function handleCancelModal(){
        form.resetFields();
        dispatch(getInfoQuestion(init_info_question))
        handleCancel();
    }
    //update value of form when change
    const onValuesChange = (fieldName) => { 
        var input_data ={...dataSubmit}
        if(fieldName.content_question !== undefined )
        {
            input_data.content_question = fieldName.content_question
            setDataSubmit(input_data)
        }
        if(fieldName.isMutiple !== undefined )
        {
            input_data.isMultiple = fieldName.isMutiple
            setStatusMultiple(input_data.isMultiple)
            setDataSubmit(input_data)
        }
        if(fieldName.answer_correct !== undefined )
        {
            input_data.answer_correct = fieldName.answer_correct
                if(input_data.isMultiple === 1)
                {
                    input_data.answer_correct= input_data.answer_correct
                }else{
                    input_data.answer_correct=[input_data.answer_correct]
                }
            setDataSubmit(input_data)
        }
    }
    const handleChangeAnswerOption =(value)=>{
        var input_data ={...dataSubmit}
        input_data.answer_choices=value
        setDataSubmit(input_data)
    } 

    return (
        <Modal
            title="Thêm câu hỏi"
            visible={isModalVisible}
            onOk={handleOK}
            onCancel={handleCancelModal}
            footer={[
                <button className="inFQ_btnCancel" key="back" onClick={handleCancelModal}>Hủy</button>,
                <button className="inFQ_btnSubmit" key="submit" type="primary" onClick={handleOK}>Thêm</button>,
              ]}
        >
             <Form
                    className="form-modal"
                    layout="vertical"
                    name="basic"
                    initialValues={{
                        remember: false,
                      }}
                    form={form}
                    onValuesChange={onValuesChange}
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
                                <Tableanswerchoice
                                   handleChangeAnswerOption={handleChangeAnswerOption}
                                />
                            </Form.Item>
                             <Selectmultiple/>
                             <Selectcorrectanswer
                                 statusMultiple={statusMultiple}
                             />
                        </Col>
                    </Row>
                </Form>
        </Modal>
    );
};
export default Modaladdquestion;
