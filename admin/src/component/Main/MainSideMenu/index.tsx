import {Menu} from "antd";
import React from "react";
import {useNavigate} from "react-router";
import {
    AppstoreAddOutlined,
    BellOutlined,
    BlockOutlined,
    CompassOutlined,
    GlobalOutlined,
    HddOutlined,
    IdcardOutlined,
    MenuFoldOutlined,
    PrinterOutlined,
    SettingOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons'

const style: React.CSSProperties = {
    backgroundColor: "white"
}

const items = [
    {label: '收起菜单', key: 'menu', icon: <MenuFoldOutlined/>},
    {label: '信息概述', key: 'home', icon: <CompassOutlined/>},
    {label: '镜像管理', key: 'image', icon: <BlockOutlined/>},
    {label: '容器管理', key: 'container', icon: <AppstoreAddOutlined/>},
    {label: '存储管理', key: 'volume', icon: <HddOutlined/>},
    {label: '网络管理', key: 'network', icon: <GlobalOutlined/>},
    {label: '模板管理', key: 'template', icon: <PrinterOutlined/>},
    {label: '监控设置', key: 'monitor', icon: <BellOutlined/>},
    {label: '系统设置', key: 'setting', icon: <SettingOutlined/>},
    {label: '授权管理', key: 'auth', icon: <UsergroupAddOutlined/>},
    {label: '关于界面', key: 'about', icon: <IdcardOutlined/>},
];

interface MainSideMenuProps {
    updateMainMenuState: Function,
    mainMenuState: boolean
}

export default function MainSideMenu(props: MainSideMenuProps) {
    let navigate = useNavigate();

    function navigateByKey({key}: any) {
        if (key == 'menu') {
            props.updateMainMenuState();
            return
        }
        navigate(`/app/${key}`)
    }


    return <Menu defaultSelectedKeys={["home"]} mode="vertical" items={items} theme="light" onClick={navigateByKey}
                 style={{height: '100%'}}/>;
}
