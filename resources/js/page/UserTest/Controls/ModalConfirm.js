import React,{ useState,useEffect} from 'react';
import { Button,Modal} from 'antd';
import { Service  } from '../Services/Services';
import { message as Message } from "antd";
import {  getResultTestUer } from "../../../../actions/getResultTest.action";
import { useDispatch} from "react-redux";
import '../Css/index.css'
const Modalconfirm = ({dataSource,handleCheckSubmit}) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => { 
       setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    function handle_ConfirmSubmit(){
        for(var i=0;i < dataSource.data_choice.length;i++)
        {
            dataSource.data_choice[i]=JSON.stringify(dataSource.data_choice[i])
        }
        Service.checkResultTest(dataSource).then((res)=>{
            var result = res.data
            result.isVisibleModal=true,
            setIsModalVisible(false);
            dispatch(getResultTestUer(result));
            handleCheckSubmit()
        }).catch(reason => {
            Message.error("Có lỗi xảy ra");
        }) 
   }
    return (
        <div>
            <Button className="Submit_BTN" type='primary' onClick={showModal} >Nộp bài</Button>
            <Modal 
                style={{ color:'black' }}
                visible={isModalVisible} 
                onCancel={handleCancel}  
                footer={null}
            >
                <div className="Confirm_area">
                    <p>Bạn muốn nộp bài ?</p> 
                    <div className="comfirm_action_button_area">
                        <div className="confirmArea">
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
