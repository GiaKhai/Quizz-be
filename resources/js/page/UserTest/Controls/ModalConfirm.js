import React,{ useState, useEffect } from 'react';
import { Button, Layout,Modal,Row, Col } from 'antd';
// import { checkPlanURL } from "../constants/backend_url";
import { Service  } from '../Services/Services';
const Modalconfirm = ({dataSource}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [form] = Form.useForm();
    
    // const handle_ClearData=()=>{
    //   var initDataShow= {...initModel} 
    //   setHandleChange_initData(initDataShow)
    // }
    const showModal = () => { 
       setIsModalVisible(true);
    };
    const handleCancel = () => {
        // handle_ClearData()
        // form.resetFields()
        setIsModalVisible(false);
    };
    function handle_ConfirmSubmit(){
        // console.log("nộp bài")
        console.log("dataSource:",dataSource)
        for(var i=0;i < dataSource.data_choice.length;i++)
        {
            dataSource.data_choice[i]=JSON.stringify(dataSource.data_choice[i])
        }

        Service.checkResultTest(dataSource).then((result)=>{
           console.log("result:",result)
        })

        // setIsSubmit(true)
        // set_Visble_Popup_Result(LANGUAGE_STATE.OPEN_MODAL)
        // setConfirmSubmit(false)
   }
    return (
        <div>
        <Button className="" type='primary' onClick={showModal} >Nộp bài</Button>
        <Modal 
        style={{ color:'black' }}
        visible={isModalVisible} 
        onCancel={handleCancel}  
      
        // width={580}
        // height={700}
        // footer={null}
        >
            <div className="Confirm_area">
                <p>Bạn muốn nộp bài ?</p> 
                <div className="comfirm_action_button_area">
                    <div>
                        <Button onClick ={handleCancel} className="CloseConfirm_button" type="primary">Hủy</Button>
                        <Button onClick ={handle_ConfirmSubmit} className="ConfirmSubmit_button" type="primary">Nộp bài</Button>
                    </div>
                
                </div>
            </div>
        
    </Modal>
    </div>
    );
};




export default Modalconfirm;
