import {Menu} from "antd";
import React from "react";
import IconFont from "../../Base/IconFont";
import {useNavigate} from "react-router";


const style: React.CSSProperties = {
    backgroundColor: "white"
}

const items = [
    {label: '首页', key: 'home', icon: <IconFont type="icon-icon-test6"/>},
    {label: '镜像管理', key: 'image', icon: <IconFont type="icon-icon-test34"/>},
    {label: '容器管理', key: 'container', icon: <IconFont type="icon-icon-test21"/>},
    {label: '储存管理', key: 'volume', icon: <IconFont type="icon-icon-test34"/>},
    {label: '网络管理', key: 'network', icon: <IconFont type="icon-icon-test29"/>},
    {label: '监控设置', key: 'monitor', icon: <IconFont type="icon-icon-test22"/>},
    {label: '系统设置', key: 'setting', icon: <IconFont type="icon-icon-test16"/>},
];

function MainSideMenu() {
    let navigate = useNavigate();

    function navigateByKey({key}: any) {
        navigate(`/app/${key}`)
    }


    return <Menu mode="vertical" items={items} style={style} onClick={navigateByKey}/>;
}

export default MainSideMenu;