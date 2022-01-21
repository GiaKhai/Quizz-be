import React,{ useState} from 'react';
import { Button,Modal} from 'antd';
import { Service  } from '../Services/Services';
import { message as Message } from "antd";
import {  getResultTestUer } from "../../../../actions/getResultTest.action";
import { useDispatch} from "react-redux";
import '../Css/index.css'
const Modalconfirm = ({dataSource,handleCheckSubmit,planTest_id,isSubmit}) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    /**
     * handle show modal
    */
    const showModal = () => { 
       setIsModalVisible(true);
    };
    /**
     * handle cancel modal
    */
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    /**
     * handle confirm when submit
    */
    function handle_ConfirmSubmit(){
        let clone_dataSource={...dataSource}

        for(var i=0;i < clone_dataSource.data_choice.length;i++)
        {
            clone_dataSource.data_choice[i]=JSON.stringify(clone_dataSource.data_choice[i])
        }
        clone_dataSource.planTest_id=planTest_id
        Service.checkResultTest(clone_dataSource).then((res)=>{
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
            {isSubmit !==true ? <Button className="Submit_BTN" type='primary' onClick={showModal} >Nộp bài</Button> :''}
            
            <Modal 
                style={{ color:'black' }}
                visible={isModalVisible} 
                onCancel={handleCancel}  
                footer={null}
            >
                <div className="Confirm_area">
                    <p className="do_you_want_to_submit">Bạn muốn nộp bài ?</p> 
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
