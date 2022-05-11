import {Menu} from "antd";
import IconFont from "../../Base/IconFont";

function MainTopNav() {
    const items = [
        {label: '安全设置', key: 'item-1',icon:<IconFont type="icon-icon-test35"/>}, // 菜单项务必填写 key
        {label: '菜单项二', key: 'item-2'},
        {label: '子菜单', key: 'submenu', children: [{label: '子菜单项', key: 'submenu-item-1'}],},
    ];
    return <Menu mode="horizontal"  theme="dark" items={items}/>;
}

export default MainTopNav;