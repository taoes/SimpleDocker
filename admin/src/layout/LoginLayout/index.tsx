import React, {useState} from "react";
import {Button, Divider, Form, Input, Layout, notification} from "antd";

import './index.css'
import {useNavigate} from "react-router-dom";

export default function LoginLayout() {

    let [username, setUsername] = useState("123")
    let [password, setPassword] = useState("31212")

    let navigate = useNavigate()

    function login() {
        navigate('/app/home');
        notification['success']({
            message: '欢迎您',
            description: '您好，您已经成功登录到SimpleDocker管理界面，祝您使用愉快'
        });
    }

    let reset = () => {
        console.log("q2")
        setUsername('')
        setPassword('')
    }

    return (
        <Layout style={{minHeight: '100%'}}>
            <div id="loginPage">
                <div id="loginForm">
                    <Form
                        name="basic"
                        wrapperCol={{span: 24}}>

                        <div id="loginTitle">
                            <img src={"/login-icon.png"} style={{height: 30, marginRight: 10}} alt=""/>
                            <h1 style={{textAlign: 'center', fontSize: 30, margin: 0}}>SimpleDocker </h1>
                        </div>

                        <Form.Item
                            label="账 户"
                            name="username">
                            <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                            label="密 码"
                            name="password">
                            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Item>

                        <div style={{display: 'flex', justifyContent: 'center'}}>

                            <Button type="primary" htmlType="button" onClick={login}>
                                登录
                            </Button>

                            <div style={{margin: 20}}/>
                            <Button danger htmlType="button" onClick={reset}>
                                重置
                            </Button>
                        </div>

                        <div>
                            <Divider orientation="right" plain>
                                <a href="https://gitee.com/taoes_admin/SimpleDocker"
                                   target="_blank"
                                   rel="noreferrer"
                                   style={{color: 'lightgray'}}>源码地址</a>
                            </Divider>
                        </div>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}