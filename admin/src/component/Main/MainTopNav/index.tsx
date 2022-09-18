import {Divider, Menu, message, notification, Radio} from "antd";
import {
  BookFilled,
  CheckOutlined,
  LineOutlined,
  NodeExpandOutlined,
  ForkOutlined,
  GithubOutlined,
  HomeFilled,
  UserOutlined,
  LogoutOutlined,
  ApiOutlined
} from "@ant-design/icons";


import './index.css'
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {endpointList} from "../../../api/Client/DockerEndpointApi";
import DockerEndpoint from "../../../api/Model/DockerEndpoint";


export default function MainTopNav() {

  let navigate = useNavigate()
  let [endpoints,setEndpoints] = useState<Array<DockerEndpoint>>([])
  useEffect(()=>loadClient(),[]);

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



  let changClient = (clientId: string, clientName: string) => {
    localStorage.setItem('clientId', clientId)
    message.loading(`您已经成功切换客户端:${clientName}，正在重新载入新环境，请稍后.....`).then();
    setTimeout(() => window.location.reload(), 2000)
  }

  let loadClient = () => {
    endpointList().then(resp => {
      if (resp.code !== 0) {
        message.info("客户端列表加载失败,请检查服务器是否正常").then();
      }
      setEndpoints(resp.data)
    })
  }


  return (
      <div id="header" style={{backgroundColor:'#001529'}}>
        <Menu mode="horizontal" theme={"dark"} selectedKeys={[]}>
          <Menu.SubMenu title="源码" icon={<HomeFilled/>} key={"sourceCode"}>
            <Menu.Item icon={<GithubOutlined/>} onClick={() => menuClick('githubSourceCode')}
                       key={"sourceCodeGithub"}>Github</Menu.Item>
            <Menu.Item icon={<ForkOutlined/>} onClick={() => menuClick('giteeSourceCode')}
                       key={"sourceCodeGitee"}>Gitee</Menu.Item>
          </Menu.SubMenu>


          <Menu.Item icon={<BookFilled/>}
                     onClick={() => menuClick('blog')}
                     key={"blog"}>博客</Menu.Item>

          <Menu.SubMenu title="服务端" icon={<ApiOutlined/>} key={"clients"}>
            {
              endpoints.map(client => {
                let icon: React.ReactNode = <LineOutlined/>
                let textStyle = {}
                if (client.id == localStorage.getItem('clientId')) {
                  icon = <CheckOutlined style={{color: "red"}}/>
                  textStyle = textStyle = {color: "red"}
                }
                return <Menu.Item onClick={() => changClient(client.id, client.name)}
                                  key={client.id} icon={icon}>
                  <span style={textStyle}>{client.name}</span>
                </Menu.Item>
              })
            }
          </Menu.SubMenu>


          <Menu.SubMenu title="账户" icon={<UserOutlined/>} key={"account"}>
            <Menu.Item onClick={() => menuClick('logout')} icon={<LogoutOutlined/>} key={"exit"}>
              退出
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
  )
}