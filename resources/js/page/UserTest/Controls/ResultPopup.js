import React,{ useState,useEffect } from 'react';
import { Button,Modal} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getResultTestUer } from "../../../../actions/getResultTest.action";
import '../Css/index.css'
const Resultpopup = ({}) => {
    const dispatch = useDispatch();
    const resultTest = useSelector((state) => state.resultTestReducers.resultTest);
    const [isModalVisible, setIsModalVisible] = useState(resultTest.isVisibleModal);
 
    const handleCancel = () => {
         let object = {
            correct: 0, 
            totalQuestion:0, 
            resultTest: false,
            isVisibleModal:false,
        }
         dispatch(getResultTestUer(object))
         setIsModalVisible(false);
    };
    useEffect(() => {
        if( resultTest.isVisibleModal ===true)
        {
            setIsModalVisible(true)
        }
     },[resultTest.isVisibleModal])
   
    return (
        <Modal 
            style={{ color:'black' }}
            visible={isModalVisible} 
            onCancel={handleCancel}
            footer={[
                <Button className="cancel_button"key="back" onClick={handleCancel}>
                  Thoát
                </Button>
            ]}
        >
            <div className="">
                <p className="numberCorrect">{`số câu đúng ${resultTest.correct}/${resultTest.totalQuestion}` }</p> 
                {
                    resultTest.resultTest === 0 ?
                    <p className="userfalseTest">Rất tiếc bạn chưa vượt qua được bài kiểm tra</p> 
                    :
                    <p className="successTest">Chúc mừng bạn vượt qua được bài kiểm tra !</p> 
                }
            </div>
    </Modal>
    );
};

export default Resultpopup;
