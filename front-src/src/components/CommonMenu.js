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

export default class CommonMenu extends React.Component {
    state = {
        collapsed: true,
    };

    render() {
        return (
            <div>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                >
                    <Menu.Item key="systemInfo" icon={<PieChartOutlined/>}>
                        <Link to='/app'>系统概述</Link>
                    </Menu.Item>
                    <Menu.Item key="imageList" icon={<DesktopOutlined/>}>
                        <Link to='/app/image'>镜像管理</Link>
                    </Menu.Item>
                    <Menu.Item key="containerList" icon={<RocketOutlined/>}>
                        <Link to='/app/container'>容器管理</Link>
                    </Menu.Item>

                    <Menu.Item key="storeList" icon={<HddOutlined/>}>
                        <Link to='/app/volume'>存储管理</Link>
                    </Menu.Item>

                    <Menu.Item key="networkList" icon={<DeploymentUnitOutlined/>}>
                        <Link to='/app/network'>网络管理</Link>
                    </Menu.Item>

                    <SubMenu key="setting" icon={<ToolOutlined/>} title="系统设置">
                        <Menu.Item key="setting-hook" icon={<SettingOutlined/>}>
                            <Link to='/app/monitor'>
                                WebHook
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="setting-notification" icon={<SettingOutlined/>}>
                            <Link to='/app/notification'>
                                通知配置
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="setting-data" icon={<SettingOutlined/>}>
                            <Link to="to='/app/data'">
                                数据管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="safe-setting" icon={<LockOutlined/>} title="安全配置">

                        <Menu.Item key="userList" icon={<InsertRowLeftOutlined/>}>
                            <Link to='/app/user'>
                                用户管理
                            </Link>
                        </Menu.Item>


                        <Menu.Item key="registryList" icon={<InsertRowLeftOutlined/>}>
                            <Link to='/app/registry'>
                                仓库管理
                            </Link>
                        </Menu.Item>


                        <Menu.Item key="dockerConnect" icon={<InsertRowLeftOutlined/>}>
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
