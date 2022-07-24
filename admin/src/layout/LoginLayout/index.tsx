import React, { } from "react";
import { Alert, Button, Divider, Form, Input, Layout, message, notification, Space } from "antd";

import './index.css'
import { login } from "../../api/Auth/AuthApi";
import WithRouter from "../../router/WithRouter";
import { RouterProps } from "react-router";



interface Props {
  router: RouterProps
}

interface State {
  username: string
  password: string
}

class LoginLayout extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }


  // let navigate = useNavigate()

  userLogin = () => {
    let { username, password } = this.state
    if (username.trim().length === 0 || password.trim().length === 0) {
      notification['error']({
        message: '登录失败',
        description: "账号或密码不能为空,请完善后重试"
      });
      return
    }


    login({ username, password })
      .then(resp => {
        let { data, code, msg } = resp
        if (code === 0) {
          localStorage.setItem('token', "Bearer " + data)
          //@ts-ignore
          this.props.router.navigate('/app/home');
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

  updateUsername = (e: any) => {
    this.setState({ username: e.target.value })
  }

  updatePassword = (e: any) => {
    this.setState({ password: e.target.value })
  }

  reset = () => {
    this.setState({ username: '', password: '' })
  }


  render() {

    // 如果是开发环境则显示演示账户号码
    let isDevelopEnv = process.env.NODE_ENV === 'development';
    let testAccountTipes = isDevelopEnv ?
      <Alert
        message="温馨提示"
        description={"当前环境为开发环境，建议使用演示账号登录(账号: admin 密码: 123456), 如有任何问题可以添加微信 zhoutao825638 或 发送电子邮件 zhoutao825638@vip.qq.com 或 访问 https://gitee.com/taoes_admin/SimpleDocker 提交问题，感谢您的使用!!"}
        type="warning"
        showIcon
        closable
      /> : undefined


    return (
      <Layout style={{ minHeight: '100%' }}>
        {testAccountTipes}
        <div id="loginPage" >
          <div id="loginForm" className="box p-4">
            <Form
              name="basic"

              wrapperCol={{ span: 24 }}>

              <div id="loginTitle">
                <img src={"/login-icon.png"} style={{ height: 30, marginRight: 10 }} alt="" />
                <h1 style={{ textAlign: 'center', fontSize: 30, margin: 0, fontWeight: 600 }}>SimpleDocker </h1>
              </div>

              <Form.Item
                label="账 户"
                name="username">
                <Input value={this.state.username} onChange={this.updateUsername} />
              </Form.Item>

              <Form.Item
                label="密 码"
                name="password">
                <Input.Password value={this.state.password} onChange={this.updatePassword} />
              </Form.Item>

              <Space style={{ display: 'flex', justifyContent: 'space-around' }}>

                <Button type="primary" htmlType="button" onClick={this.userLogin}>
                  登录
                </Button>

                <Button danger htmlType="button" onClick={this.reset}>
                  重置
                </Button>
              </Space>

              <div>
                <Divider orientation="right" plain>
                  <a href="https://gitee.com/taoes_admin/SimpleDocker"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'lightgray' }}>源码地址</a>
                </Divider>
              </div>
            </Form>
          </div>
        </div >
      </Layout >
    )
  }
}

export default WithRouter(LoginLayout)