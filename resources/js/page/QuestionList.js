import React, { useState } from "react";
import { Typography, Radio } from "antd";

const { Title } = Typography;

function QuestionList({ questionList }) {
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className="content-page">
            <div className="title">Câu hỏi</div>
            {questionList?.map((ques, index) => (
                <div key={index} className="question">
                    <Title level={4}>
                        {index + 1}/ {ques.question}
                    </Title>
                    <div className="answers">
                        <Radio.Group onChange={onChange} value={value}>
                            {ques.answers?.map((ans) => (
                                <Radio value={ans.answer}>{ans.answer}</Radio>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuestionList;
