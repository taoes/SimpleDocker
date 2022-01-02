import React from "react";

import {Menu} from 'antd';
import {
    DeploymentUnitOutlined,
    DesktopOutlined,
    HddOutlined,
    InsertRowLeftOutlined,
    LockOutlined,
    PieChartOutlined,
    RocketOutlined,
    SettingOutlined,
    ToolOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";

const {SubMenu} = Menu;

class CommonMenu extends React.Component {
    state = {
        collapsed: true,
    };

    render() {
        return (
            <div>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<PieChartOutlined/>}>
                        <Link to='/app'>系统概述</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        <Link to='/app/image'>镜像管理</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<RocketOutlined/>}>
                        <Link to='/app/container'>容器管理</Link>
                    </Menu.Item>

                    <Menu.Item key="4" icon={<HddOutlined/>}>
                        <Link to='/app/volume'>存储管理</Link>
                    </Menu.Item>

                    <Menu.Item key="5" icon={<DeploymentUnitOutlined/>}>
                        <Link to='/app/network'>网络管理</Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<ToolOutlined/>} title="系统设置">
                        <Menu.Item key="monitorPage" icon={<SettingOutlined/>}>
                            <Link to='/app/monitor'>
                                WebHook
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="notificationPage" icon={<SettingOutlined/>}>
                            <Link to='/app/notification'>
                                通知配置
                            </Link>
                        </Menu.Item>

                        <Menu.Item to='/app/data' key="13" icon={<SettingOutlined/>}>数据管理</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" icon={<LockOutlined/>} title="安全配置">

                        <Menu.Item key="userPage" icon={<InsertRowLeftOutlined/>}>
                            <Link to='/app/user'>
                                用户管理
                            </Link>
                        </Menu.Item>


                        <Menu.Item key="registryPage" icon={<InsertRowLeftOutlined/>}>
                            <Link to='/app/registry'>
                                仓库管理
                            </Link>
                        </Menu.Item>


                        <Menu.Item key="dockerPage" icon={<InsertRowLeftOutlined/>}>
                            <Link to='/app/docker'>
                                连接管理
                            </Link>
                        </Menu.Item>


                    </SubMenu>
                </Menu>
            </div>
        )
    }


}

export default CommonMenu;
