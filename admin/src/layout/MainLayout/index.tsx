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
  let [mainMenuState, setMainMenuState] = useState<boolean>(false)
  let updateMainMenuState = () => {
    setMainMenuState(!mainMenuState)
  }

  return (
      <Layout>
        <Header className={"has-background-white"}>
          <MainTopNav/>
        </Header>

        <Layout style={{height:'100%'}}>
          <Sider trigger={null} collapsible collapsed={mainMenuState} style={{height:'100%'}}>
            <MainSideMenu updateMainMenuState={updateMainMenuState} mainMenuState/>
          </Sider>

          <Content className="m-2 has-background-white" style={{height:'100%'}}>
            <Outlet/>
          </Content>

        </Layout>
        <Footer>
          <MainFooter/>
        </Footer>
      </Layout>
  )
}