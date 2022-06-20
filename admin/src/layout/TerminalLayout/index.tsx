import {Layout} from "antd";
import React, {useState} from "react";


import ContainerTerminal from "../../page/ContainerTerminal";
import MainTopNav from "../../component/Main/MainTopNav";
import TerminalMenu from "../../component/Main/TerminalMenu";


const {Header, Footer, Content} = Layout;

export default function TerminalLayout() {


  return (


      <Layout>

        <Content>
          <ContainerTerminal/>
        </Content>
        <Footer>

        </Footer>
      </Layout>
  )
}