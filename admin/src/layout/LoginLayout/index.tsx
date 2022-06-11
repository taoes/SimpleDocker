import React, {useState} from "react";
import {Button, Divider, Form, Input, Layout, notification} from "antd";

import './index.css'
import {useNavigate} from "react-router-dom";
import {login} from "../../api/Auth/AuthApi";

export default function LoginLayout() {

  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")

  let navigate = useNavigate()

  let userLogin = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      notification['error']({
        message: '登录失败',
        description: "账号或密码不能为空,请完善后重试"
      });
      return
    }


    login({username, password})
    .then(resp => {
      let {data, code, msg} = resp
      if (code === 0) {
        localStorage.setItem('token', "Bearer " + data)
        navigate('/app/home');
        notification['success']({
          message: '登录成功',
          description: '您好，您已经成功登录到SimpleDocker管理界面，祝您使用愉快'
        });
        return
      }
      notification['error']({
        message: '登录失败',
        description: msg
      });
    })

  }

  let reset = () => {
    setUsername("")
    setPassword("")
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

                <Button type="primary" htmlType="button" onClick={userLogin}>
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