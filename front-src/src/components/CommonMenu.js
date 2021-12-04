import React from "react";

import {Menu} from 'antd';
import {
    DeploymentUnitOutlined,
    DesktopOutlined,
    HddOutlined,
    InsertRowLeftOutlined,
    LinkOutlined,
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
                        <Link to='/'>系统概述</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        <Link to='/image'>镜像管理</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<RocketOutlined/>}>
                        <Link to='/container'>容器管理</Link>
                    </Menu.Item>

                    <Menu.Item key="4" icon={<HddOutlined/>}>
                        <Link to='/volume'>存储管理</Link>
                    </Menu.Item>

                    <Menu.Item key="5" icon={<DeploymentUnitOutlined/>}>
                        <Link to='/network'>网络管理</Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<ToolOutlined/>} title="系统设置">
                        <Menu.Item key="11" icon={<SettingOutlined/>}>监控配置</Menu.Item>
                        <Menu.Item key="12" icon={<SettingOutlined/>}>通知配置</Menu.Item>
                        <Menu.Item key="13" icon={<SettingOutlined/>}>数据管理</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" icon={<LockOutlined/>} title="安全配置">
                        <Menu.Item key="9" icon={<InsertRowLeftOutlined/>}>仓库管理</Menu.Item>
                        <Menu.Item key="10" icon={<LinkOutlined/>}>连接管理</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }


}

export default CommonMenu;