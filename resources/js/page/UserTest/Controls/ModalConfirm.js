import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { Service } from "../Services/Services";
import { message as Message } from "antd";
import { getResultTestUer } from "../../../../actions/getResultTest.action";
import { postPlanResultTest } from "../../../../actions/result.action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MethodCommon } from "../../../../common/MethodCommon";
import { INFO_USER } from "../../../../common/parameters";

import "../Css/index.css";
const Modalconfirm = ({ dataSource, handleCheckSubmit }) => {
    const dispatch = useDispatch();
    let { planTest_id } = useParams();
    let data_user = MethodCommon.getLocalStorage(INFO_USER);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isResult, setIsResult] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const resultTest = useSelector(
        (state) => state.resultTestReducers.resultTest.resultTest
    );

    // useEffect(() => {
    //     setIsResult(resultTest);
    //     console.log(isResult);
    // }, [resultTest]);
    function handle_ConfirmSubmit() {
        for (var i = 0; i < dataSource.data_choice.length; i++) {
            dataSource.data_choice[i] = JSON.stringify(
                dataSource.data_choice[i]
            );
        }
        Service.checkResultTest(dataSource)
            .then((res) => {
                var result = res.data;
                (result.isVisibleModal = true), setIsModalVisible(false);
                dispatch(getResultTestUer(result));
                handleCheckSubmit();
                let body = {
                    number_correct: result.correct,
                    total_question: result.totalQuestion,
                    plan_id: Number(planTest_id),
                    user_id: data_user.id,
                    result_test: String(
                        (result.correct / result.totalQuestion) * 100 >= 95
                    ),
                };
                console.log(body);
                dispatch(postPlanResultTest(body));
            })
            .catch((reason) => {
                // Message.error("Có lỗi xảy ra");
            });
    }

    return (
        <div>
            <Button className="Submit_BTN" type="primary" onClick={showModal}>
                Nộp bài
            </Button>
            <Modal
                style={{ color: "black" }}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="Confirm_area">
                    <p>Bạn muốn nộp bài ?</p>
                    <div className="comfirm_action_button_area">
                        <div className="confirmArea">
                            <Button
                                onClick={handleCancel}
                                className="CloseConfirm_button"
                                type="primary"
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={handle_ConfirmSubmit}
                                className="ConfirmSubmit_button"
                                type="primary"
                            >
                                Nộp bài
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Modalconfirm;
