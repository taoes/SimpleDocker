import { Form, Button, Input, Checkbox, Space } from "antd";
import './LoginPage.css'
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        navigate("/summary")
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div id="loginPage">
            <div id="loginForm">
                <h1 className="textCenter b-900">欢迎登录 Simple Docker 2.0</h1>
                <Form
                    name="basic"
                    labelCol={{
                        span: 3,
                    }}
                    wrapperCol={{
                        span: 21,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名或电子邮箱',
                            },
                        ]}
                    >
                        <Input placeholder="请输入用户名或电子邮箱" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        name="captchaCode"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Input placeholder="请输入验证码" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Space align="center">
                            <Button type="primary" htmlType="submit">登录</Button>
                            <Button danger htmlType="button">重置</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}