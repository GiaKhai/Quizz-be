import React,{useEffect} from "react";
import { Form, Input, Row, Col, Modal, Select,Button} from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { getPlanAction } from "../../actions/testPlan.action";
import { getPlanAction ,getPlanActionPublic} from "../../../actions/testPlan.action";
import { useHistory } from "react-router-dom";
import './index.css'
const { Option } = Select;

const ModalDoTest = ({ 
    handleCancel,
    isModalVisible,
    handleSubmit,
    form
}) => {
    let history = useHistory();
    // history.push("/login")
    const dispatch = useDispatch();
    const planList = useSelector((state) => state.planReducers.planList);
    // history.push(`/do_test/${planTest_id}`)
    console.log("planList:",planList)
    const handeGotoTestPage=(id)=>{
        history.push(`/do_test/${id}`)
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
                        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                         <div className="Plan_Item" onClick={()=>handeGotoTestPage(ques.id)}>
                            <div>
                                 <p>{ques.id}</p>
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
