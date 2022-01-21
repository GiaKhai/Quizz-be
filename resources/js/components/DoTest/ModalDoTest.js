import React,{useEffect} from "react";
import { Form, Input, Row, Col, Modal, Select,Button} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPlanAction ,getPlanActionPublic} from "../../../actions/testPlan.action";
import { MethodCommon } from '../../../common/MethodCommon'
import {TOKEN_NAME,INFO_USER,REFRESH_TOKEN,LIMITE_PAGE} from '../../../common/parameters'
import { useHistory } from "react-router-dom";
import './index.css'
import { Service  } from './Services/Services';
import { message as Message } from "antd";
const { Option } = Select;

const ModalDoTest = ({ 
    handleCancel,
    isModalVisible,
    handleSubmit,
    form
}) => {
    let data_user = MethodCommon.getLocalStorage(INFO_USER)
    let history = useHistory();
    const dispatch = useDispatch();
    const planList = useSelector((state) => state.planReducers.planListPublic);

    const handeGotoTestPage=(id)=>{
        let plan_id=id
        let user_id=data_user.id
        let body={
            plan_id,
            user_id
        }
        Service.handleCheckUserExistHistory(body).then((response)=>{
             let result =response.data
             if(result.resultCheck=== true)
             {
                Message.warning("Bạn đã làm kì thi này rồi, vui lòng chọn kì thi khác !");
             }else{
                Message.success("Vào thi thành công !");
                history.push(`/do_test/${id}`)
             }
        })
    }
    useEffect(() => {
        dispatch(getPlanActionPublic());
    }, [dispatch]);
    return (
        <div>
            <Modal
                title="Kế hoạch thi"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="planlist_public_area">   
                <Row className = "search_area" > 
                    {planList?.map((ques, index) => (
                        <Col key={index} xs={8} sm={8} md={8} lg={6} xl={6}>
                         <div className="Plan_Item" onClick={()=>handeGotoTestPage(ques.id)}>
                            <div>
                               {ques.title}
                            </div>
                        </div>
                        </Col>
                   
                    ))}
                     </Row>
                </div>
            </Modal>
        </div>
    );
};

export default ModalDoTest;
