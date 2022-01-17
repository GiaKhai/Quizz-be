import React, { useState } from "react";
import { Typography, Radio,Button,Checkbox,Modal} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Addquestion from "../../../containers/AddQuestion";
import './Css/index.css'
import {deleteQuestion } from "../../../constants/backend_url";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionAction } from "../../../actions/question.action";
import { useForm } from "antd/lib/form/Form";
import { message as Message } from "antd";
const { Title } = Typography;
const { confirm } = Modal;
function QuestionList({  }) {
    const [form] = useForm();
    const dispatch = useDispatch();
    const [value, setValue] = useState(1);
    const questionList = useSelector((state) => state.questionReducers.questionList);
    const [isModalVisible, setIsModalVisible] = useState(false);
   
    //handle show modal Add
    const showModal = () => {
        setIsModalVisible(true);
    };
    //handle cancel modal Add
    const handleCancel = () => {
       
        setIsModalVisible(false);
    };
    //handle delete data
    const handleDeleteData=(id)=>{
        console.log("xóa")
        confirm({
            content:"Bạn muốn xóa",
            onOk() {
                axios.delete( `${deleteQuestion}/${id}`).then((res)=>{
                     if (res.status === 200) {
                        Message.success("Xóa dữ liệu thành công");
                        dispatch(getQuestionAction());
                    }
                })   
            },
            onCancel() {
            },
            okText:"Có",
            cancelText:"Không"
        })
    }
    return (
        <div className="content-page">
            <div className="title">Câu hỏi</div>
            <Button
                className="add-user"
                type="primary"
                shape="round"
                icon={<UserAddOutlined />}
                size="large"
                onClick={showModal}
            >
                Thêm câu hỏi
            </Button>
            {questionList?.map((ques, index) => (
                <div key={index} className="question">
                    <Title level={4}>
                        {index + 1}/ {ques.question}
                    </Title>
                    <div className="answers">
                        {ques.is_multiple === 1 ?
                            <div >
                                {
                                    ques.answers?.map((ans,indexAns) => (
                                        <div key={indexAns}>
                                            <div>
                                                <Checkbox checked={ ans.correct===1 ? ans.id:null}>
                                                {ans.answer}
                                                </Checkbox>
                                                <br></br>
                                            </div>
                                            
                                        </div>
                                    ))
                                }
                                <div className="screenQues_btnAction">
                                          <button className="screenQues_btnRemove" onClick={()=>handleDeleteData(ques.id)}>Xóa</button>   
                                          <button className="screenQues_btnEdit">Sửa</button>   
                                </div>
                            </div>
                            
                        :
                        <div >
                            {
                                ques.answers?.map((ans,indexAns) => (
                                    <div key={indexAns}>
                                        <Radio.Group onChange={ null } value={ans.correct===1 ? ans.id:null}>
                                            <Radio value={ans.id}>{ans.answer}</Radio>
                                        </Radio.Group>
                                        <br></br>
                                        <div className="screenQues_btnAction">
            
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="screenQues_btnAction">
                                          <button className="screenQues_btnRemove" onClick={()=>handleDeleteData(ques.id)}>Xóa</button>   
                                          <button className="screenQues_btnEdit">Sửa</button>   
                            </div>
                        </div>
                            
                        }
                </div>
                </div>
            ))}
            <Addquestion
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
            />
        </div>
    );
}

export default QuestionList;
