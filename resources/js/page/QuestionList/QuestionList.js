import React, { useState,useEffect } from "react";
import { Typography, Radio,Button,Checkbox,Modal} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Addquestion from "../../../containers/AddQuestion";
import './Css/index.css'
import {deleteQuestion } from "../../../constants/backend_url";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionAction } from "../../../actions/question.action";
import { useForm } from "antd/lib/form/Form";
import { message as Message } from "antd";
import Editquestion from "../../../containers/EditQuestion";
import { getInfoQuestion } from "../../../actions/question.action";
import { init_info_question,init_pagination } from './Model/Model';
import Questionlistpagination from "./Controls/QuestionListPagination";
import { Service  } from './Services/Services';
import axios from "axios";
const { Title } = Typography;
const { confirm } = Modal;
function QuestionList({  }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.questionReducers.questionList);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [pagination, setPagination] =useState(init_pagination);
    const [questionList,setQuestionList]=useState(data);
    const [totalPage,setTotaPage]=useState(0);
    const [pageSize,setpageSize]=useState(10);
   
    function CallAPI(body){
        Service.loadingQuestion(body).then((response)=>{
            let result =response.data
            setQuestionList(result.data)
            setTotaPage(result.totalPage)
        })
    }

    useEffect(() => { 
        let body={
            currentPage:pagination.currentPage,
            perPage: pagination.perPage
        }
        CallAPI(body)
    },[data]);

    //handle change pagezie
    const handleChangePageSize=(value)=>{
        let body={
            currentPage:pagination.currentPage,
            perPage: value
        }
        setPagination(body)
        setpageSize(value)
        CallAPI(body)
    }

    //handle change pagezie
    const handleChangePageCurrent=(value)=>{
        let body={
            currentPage:value,
            perPage: pagination.perPage
        }
        setPagination(body)
        Service.loadingQuestion(body).then((response)=>{
            let result =response.data
            setQuestionList(result.data)
            setTotaPage(result.totalPage)
        })
    }
    //handle show modal Add
    const showModal = () => {
        setIsModalVisible(true);
    };
    //handle cancel modal Add
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //handle show modal Edit
    const showModalEdit = (record) => {
        let clone_model = {...init_info_question}
        clone_model.id=record.id
        clone_model.content_question =record.question
        clone_model.isMultiple =record.is_multiple
        let newAnswerOption =[]
        let newArrCorrectAnswer=[]
        for(var i=0;i<record.answers.length;i++)
        {
            let object = {
                id:record.answers[i].id,
                key:i+1,
                content:record.answers[i].answer
            }
            newAnswerOption.push(object)
            if(record.answers[i].correct === 1){
                newArrCorrectAnswer.push(i+1)

            }
        }
        clone_model.answer_choices=newAnswerOption
        clone_model.answer_correct=newArrCorrectAnswer
        dispatch(getInfoQuestion(clone_model))
        setIsModalVisibleEdit(true);
    };
    //handle cancel modal Edit
    const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
    };
    //handle delete data
    const handleDeleteData=(id)=>{
        confirm({
            content:"Bạn muốn xóa",
            onOk() {
                axios.delete( `${deleteQuestion}/${id}`).then((res)=>{
                     if (res.status === 200) {
                        Message.success("Xóa dữ liệu thành công");
                        let body={
                            currentPage:pagination.currentPage,
                            perPage: pagination.perPage
                        }
                        CallAPI(body)
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
                        <p>{ques.index} / {ques.question}</p>
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
                                          <button className="screenQues_btnEdit" onClick={()=>showModalEdit(ques)}>Sửa</button>   
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
                                          <button className="screenQues_btnEdit"   onClick={()=>showModalEdit(ques)}>Sửa</button>   
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
                pagination={pagination}
            />
            <Editquestion
                setIsModalVisible={setIsModalVisibleEdit}
                isModalVisible={isModalVisibleEdit}
                handleCancel={handleCancelEdit}
                pagination={pagination}
            />
            <div className="question_pagination_area">
                <Questionlistpagination
                handleChangePageSize={handleChangePageSize}
                handleChangePageCurrent={handleChangePageCurrent}
                totalPage={totalPage}
                pageSize={pageSize}
                />
            </div>
          
        </div>
    );
}

export default QuestionList;
