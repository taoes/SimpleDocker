import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    ContainerOutlined,
    ClusterOutlined,
    BugOutlined,
    DatabaseOutlined,
    CopyrightOutlined,
    LockOutlined,
    ProductOutlined,
    UsergroupAddOutlined,
    ApiOutlined,
    DeleteRowOutlined,
    LogoutOutlined,
    IssuesCloseOutlined,

} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css'
const { Header, Content, Footer, Sider } = Layout;
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';



const topMenu = [
    { key: '/safe', label: '安全设置', icon: <LockOutlined /> },
    { key: '/log', label: '运行日志', icon: <FileOutlined /> },
    { key: '/about', label: '关于软件', icon: <CopyrightOutlined /> },
    { key: '/feedback', label: '问题反馈', icon: <BugOutlined /> },
]


const userMenuProps = {
    items: [
        { key: '/safe', label: '切换宿主机', icon: <DeleteRowOutlined /> },
        { key: '/cache', label: '重新载入', icon: <IssuesCloseOutlined /> },
        { key: '/log', label: '退出登录', icon: <LogoutOutlined /> }
    ],
    onclick: () => { }
}

const items = [
    { key: '/summary', label: '状态概述', icon: <DesktopOutlined /> },
    { key: '/images', label: '镜像列表', icon: <ProductOutlined /> },
    { key: '/container', label: '容器列表', icon: <ContainerOutlined /> },
    { key: '/network', label: '网络设置', icon: <ClusterOutlined /> },
    { key: '/volumn', label: '存储设置', icon: <DatabaseOutlined /> },
    { key: '/user', label: '用户管理', icon: < UsergroupAddOutlined /> },
    { key: '/host', label: '连接授权', icon: <ApiOutlined /> },
    { key: '/about', label: '关于软件', icon: <CopyrightOutlined /> },
]

function AdminLayout() {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(true);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const onMenuClick = (({ key }) => {
        navigate(key)
    })
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" >
                    <span className='title'>SimpleDocker 2.0</span>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[]}
                    onSelect={onMenuClick}
                    items={topMenu}
                    style={{ flex: 1, minWidth: 0 }}
                />

                <Dropdown menu={userMenuProps} placement={'bottom'}>
                    <div>
                        <Avatar icon={<img src={url} alt='' />} />
                        <span className='ml-10 white'>欢迎您</span>
                    </div>
                </Dropdown>
            </Header>
            <Layout style={{ marginTop: 10 }}>
                <Sider width={200} style={{ background: colorBgContainer }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <Menu
                        mode="inline"
                        selectedKeys={[]}
                        onSelect={onMenuClick}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            height: 'calc(100vh - 120px)',
                            overflow: 'auto',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    )
}

export default AdminLayout;