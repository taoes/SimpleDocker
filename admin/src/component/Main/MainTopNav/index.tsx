import {Menu, notification} from "antd";
import {
  BookFilled,
  BugFilled,
  ForkOutlined,
  GithubOutlined,
  HomeFilled,
  MenuFoldOutlined,
  LogoutOutlined
} from "@ant-design/icons";


import './index.css'
import {useNavigate} from "react-router";
import React from "react";



export default function MainTopNav() {

  let navigate = useNavigate()

  // 点击菜单
  let menuClick = (operator: string) => {
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
        logout()
        break
      default:
    }
  }

  let logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    notification['info']({
      message: '欢迎您',
      description: '您好，您已经成功退出SimpleDocker管理界面，期待您的下次使用'
    });
  }


  return (
      <div id="header">
        <Menu mode="horizontal" theme={"dark"} selectedKeys={[]}>
          <Menu.Item icon={<BugFilled/>} onClick={() => menuClick('feedback')} key={"feedback"}>反馈</Menu.Item>
          <Menu.SubMenu title="源码" icon={<HomeFilled/>} key={"sourceCode"}>
            <Menu.Item icon={<GithubOutlined/>}  onClick={() => menuClick('githubSourceCode')} key={"sourceCodeGithub"}>Github</Menu.Item>
            <Menu.Item icon={<ForkOutlined/>} onClick={() => menuClick('giteeSourceCode')} key={"sourceCodeGitee"}>Gitee</Menu.Item>
          </Menu.SubMenu>


          <Menu.Item icon={<BookFilled/>} onClick={() => menuClick('blog')} key={"blog"}>博客</Menu.Item>
          <Menu.SubMenu title="账户" icon={<HomeFilled/>} key={"account"}>
            <Menu.Item onClick={() => menuClick('logout')} icon={<LogoutOutlined/>} key={"exit"}>
              退出
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
  )
}