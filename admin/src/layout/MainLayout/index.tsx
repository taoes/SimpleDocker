import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import MainTopNav from "../../component/Main/MainTopNav";
import MainSideMenu from "../../component/Main/MainSideMenu";
import MainFooter from "../../component/Main/MainFooter";
import React, {useState} from "react";

import './index.css'
import {MenuFoldOutlined} from "@ant-design/icons";
const {Header, Sider, Content, Footer} = Layout;

export default function MainLayout() {
  let [mainMenuState, setMainMenuState] = useState<boolean>(true)
  let updateMainMenuState = () => {
    setMainMenuState(!mainMenuState)
  }

  return (
      <Layout>
        <Sider trigger={null}  collapsible collapsed={mainMenuState} style={{}}>
          <div className={"logo"} />
          <MainSideMenu updateMainMenuState={updateMainMenuState} mainMenuState/>
        </Sider>

        <Layout>
          <Header>
            <MainTopNav />
          </Header>
          <Content className="m-3 has-background-white">
            <Outlet/>
          </Content>
          <Footer>
            <MainFooter/>
          </Footer>
        </Layout>
      </Layout>
  )
}