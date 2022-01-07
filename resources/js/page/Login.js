import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useForm } from "antd/lib/form/Form";

const Login = () => {
    const [form] = useForm();

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleSubmit = async () => {
        let cookie = document.cookie;
        console.log(cookie);
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/login",
                form.getFieldsValue()
            );
            // console.log(response.data.success);
            if (response.status === 200) {
                console.log("Login ok");

                // document.cookie = `token=${data.token};path=/;`;
                // document.cookie = `refresh=${data.refresh};path=/;`;
            }
        } catch (error) {
            console.log("Login false");
        }
    };

    return (
        <div className="login-page">
            <Form
                className="form login-form"
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                form={form}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
            >
                <h1>User Login</h1>
                <Form.Item
                    className="item"
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <div className="check">
                    <Checkbox>Remember me</Checkbox>
                </div>
                <div>
                    <Button
                        className="btn-submit"
                        type="primary"
                        htmlType="submit"
                    >
                        Sign in
                    </Button>
                </div>
            </Form>
        </div>
    );
};
export default Login;
