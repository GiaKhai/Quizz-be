import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useForm } from "antd/lib/form/Form";
import { message as Message } from "antd";
import { MethodCommon } from '../../common/MethodCommon'
import {TOKEN_NAME,INFO_USER,REFRESH_TOKEN} from '../../common/parameters'
import { useHistory } from "react-router-dom";

    
const Login = () => {
    let history = useHistory();
    const [form] = useForm();

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleSubmit = async () => {
        let cookie = document.cookie;
        // console.log(cookie);
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/login",
                form.getFieldsValue()
            );
            let result = response.data
            if(result.login_success !== undefined && result.login_success === true){
                Message.success("Đăng nhập thành công");
                let access_token=result.token
                let user_info = result.user_info
                MethodCommon.saveCookies(TOKEN_NAME,access_token) 
                MethodCommon.saveLocalStorage(INFO_USER,user_info)
                history.push("/")
            }
            if(result.user_not_found !== undefined && result.user_not_found === true){
                Message.warning("Người dùng không tồn tại");
            }
            if(result.password_not_correct !== undefined && result.password_not_correct === true){
                Message.warning("Mật khẩu không đúng");
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
