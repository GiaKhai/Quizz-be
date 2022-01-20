import React, { useState, useEffect } from "react";
import { Button, Layout, Modal, Row, Col, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import '../Css/index.css'
import { useHistory } from "react-router-dom";

const Resultpopup = ({}) => {
    let history = useHistory();
    const resultTest = useSelector(
        (state) => state.resultTestReducers.resultTest
    );
    const [isModalVisible, setIsModalVisible] = useState(
        resultTest.isVisibleModal
    );

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        history.push("/");
    };
    useEffect(() => {
        if (resultTest.isVisibleModal === true) {
            setIsModalVisible(true);
        }
    }, [resultTest.isVisibleModal]);

    return (
        <Modal
            style={{ color: "black" }}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button
                    className="cancel_button"
                    key="back"
                    onClick={handleCancel}
                >
                    Thoát
                </Button>,
            ]}
        >
            <div className="">
                <p>{`số câu đúng ${resultTest.correct}/${resultTest.totalQuestion}`}</p>
                {resultTest.resultTest === false ? (
                    <p>Rất tiếc bạn chưa vượt qua được bài kiểm tra</p>
                ) : (
                    <p>Chúc mừng bạn vượt qua được bài kiểm tra !</p>
                )}
            </div>
        </Modal>
    );
};

export default Resultpopup;
