import {Menu, notification} from "antd";
import {BookFilled, BugFilled, ForkOutlined, GithubOutlined, HomeFilled, LogoutOutlined} from "@ant-design/icons";

import './index.css'
import {useNavigate} from "react-router";

function MainTopNav() {

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
        navigate('/login')
        notification['info']({
            message: '欢迎您',
            description: '您好，您已经成功退出SimpleDocker管理界面，期待您的下次使用'
        });
    }

    return (
        <div id="header">
            <div style={{marginRight: 'auto', display: 'flex', alignItems: 'center'}}>
                <img src={"/logo.png"} style={{height: 40}} alt=""/>
            </div>
            <Menu mode="horizontal" theme="dark" selectedKeys={[]}>
                <Menu.Item icon={<BugFilled/>} onClick={() => menuClick('feedback')}>反馈</Menu.Item>
                <Menu.SubMenu title="源码" icon={<HomeFilled/>}>
                    <Menu.Item icon={<GithubOutlined/>}
                               onClick={() => menuClick('githubSourceCode')}>Github</Menu.Item>
                    <Menu.Item icon={<ForkOutlined/>}
                               onClick={() => menuClick('giteeSourceCode')}>Gitee</Menu.Item>
                </Menu.SubMenu>


                <Menu.Item icon={<BookFilled/>} onClick={() => menuClick('blog')}>博客</Menu.Item>
                <Menu.SubMenu title="账户" icon={<HomeFilled/>}>
                    <Menu.Item onClick={() => menuClick('logout')} icon={<LogoutOutlined/>}>
                        退出
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}

export default MainTopNav;