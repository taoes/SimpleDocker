import React from "react";
import {Menu} from "antd";
import {Navigate} from "react-router-dom";
import {BugFilled, GithubOutlined, BookFilled, HomeFilled, LogoutOutlined, ForkOutlined} from "@ant-design/icons";


class LoginInfo extends React.Component {

    state = {
        logout: false
    }

    menu = (
        <Menu>
            <Menu.Item onClick={() => this.menuClick('logout')} icon={<LogoutOutlined/>}>
                退出
            </Menu.Item>
        </Menu>
    );

    // 点击菜单
    menuClick(operator) {
        switch (operator) {
            case 'feedback':
                window.open('https://gitee.com/taoes_admin/SimpleDocker/issues/new', '_blank')
                break
            case 'githubSourceCode':
                window.open('https://github.com/taoes/SimpleDocker', '_blank')
                break
            case 'giteeSourceCode':
                window.open('https://gitee.com/taoes_admin/SimpleDocker', '_blank')
                break
            case 'blog':
                window.open('https://www.zhoutao123.com/', '_blank')
                break
            case 'logout':
                localStorage.removeItem('TOKEN')
                this.setState({logout: true})
                break
            default:
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.logout && <Navigate to="/"/>
                }
                <Menu mode="horizontal" theme="dark">
                    <Menu.Item icon={<BugFilled/>} onClick={() => this.menuClick('feedback')}>反馈</Menu.Item>
                    <Menu.SubMenu title="源码" icon={<HomeFilled/>}>
                        <Menu.Item icon={<GithubOutlined/>}
                                   onClick={() => this.menuClick('githubSourceCode')}>Github</Menu.Item>
                        <Menu.Item icon={<ForkOutlined/>}
                                   onClick={() => this.menuClick('giteeSourceCode')}>Gitee</Menu.Item>
                    </Menu.SubMenu>


                    <Menu.Item icon={<BookFilled/>} onClick={() => this.menuClick('blog')}>博客</Menu.Item>
                    <Menu.SubMenu title="账户" icon={<HomeFilled/>}>
                        <Menu.Item onClick={() => this.menuClick('logout')} icon={<LogoutOutlined/>}>
                            退出
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </div>
        )
    }


}

export default LoginInfo;
