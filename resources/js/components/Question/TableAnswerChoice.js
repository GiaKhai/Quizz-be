import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import Selectcorrectanswer from "./SelectCorrectAnswer";
import { getInfoQuestion } from "../../../actions/question.action";
import { useDispatch, useSelector } from "react-redux";

const { TextArea } = Input;
const Tableanswerchoice = ({handleChangeAnswerOption}) => {

    const dispatch = useDispatch();
    const info_question = useSelector(
        (state) => state.inFoQuestionReducer.info_question
    );
    let dataSourceInit = info_question.answer_choices;
    const [dataSource, handleChange_DataSource] = useState(dataSourceInit);

    //handle change content
    function handleChangeContent(e, record) {
        var content = e.target.value;
        let newArr = dataSource.map((item, i) => {
            if (record.key - 1 === i) {
                return { ...item, content: content };
            } else {
                return item;
            }
        });
        let new_info={...info_question}
        new_info.answer_choices=newArr
        handleChangeAnswerOption(newArr)
        // dispatch(getInfoQuestion(new_info))
        handleChange_DataSource(newArr);
    }
    const columns = [
        {
            title: "STT",
            key: "id",
            dataIndex: "key",
            align: "center",
            width: 120,
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            align: "center",
            width: 200,
            render: (_, record) => {
                return (
                    <TextArea
                        value={record.content}
                        disabled={false}
                        style={{ background: "#f5f5f5" }}
                        autoSize={{ minRows: 1, maxRows: 5 }}
                        onChange={(e) => handleChangeContent(e, record)}
                    />
                );
            },
        },
    ];
    return (
        <div>
            <Table  
                columns={columns} 
                dataSource={dataSource} 
                pagination={false}
            />
            
        </div>
    );
};

export default Tableanswerchoice;
