import React, { useState } from "react";
import { Table, Input } from "antd";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const Tableanswerchoice = ({handleChangeAnswerOption}) => {

    const info_question = useSelector(
        (state) => state.inFoQuestionReducer.info_question
    );
    let dataSourceInit = info_question.answer_choices;
    const [dataSource, handleChange_DataSource] = useState(dataSourceInit);

    /**
     * handle change content
     * @param {*} e
     *  @param {*} record
     * @returns 
     */
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
