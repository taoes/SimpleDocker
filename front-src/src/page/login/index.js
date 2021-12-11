import React from "react";
import {Form, Input, Button, message} from "antd";


import './index.css'
import {Navigate} from "react-router-dom";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            state: false
        }
    }


    /**
     * 用户登录动作
     */
    login = () => {
        let {username, password} = this.state
        if (username !== 'admin' || password !== '123456') {
            message.error('登录失败，请稍后尝试')
            return
        }
        message.info('登录成功，即将跳转到APP页面')
        this.setState({state: true})
    }

    render() {
        return (

            <div id="loginPage">
                {
                    this.state.state === true && (<Navigate to="/app"/>)
                }
                <div id="loginForm">
                    <Form
                        name="basic"
                        wrapperCol={{span: 24}}>

                        <div id="loginTitle">
                            <img src={"/icon2.png"} style={{height: 30, marginRight: 10}} alt=""/>
                            <h1 style={{textAlign: 'center', fontSize: 30, margin: 0}}>SimpleDocker </h1>
                        </div>

                        <Form.Item
                            label="账 户"
                            name="username">
                            <Input value={this.state.username}
                                   onChange={(e) => this.setState({username: e.target.value})}/>
                        </Form.Item>

                        <Form.Item
                            label="密 码"
                            name="password">
                            <Input.Password value={this.state.password}
                                            onChange={(e) => this.setState({password: e.target.value})}/>
                        </Form.Item>

                        <div style={{display: 'flex', justifyContent: 'center'}}>

                            <Button type="primary" htmlType="button" onClick={this.login}>
                                登录
                            </Button>

                            <div style={{margin: 20}}/>
                            <Button type="danger" htmlType="button">
                                重置
                            </Button>


                        </div>
                    </Form>
                </div>
            </div>
        );

    }
}

export default LoginPage;
