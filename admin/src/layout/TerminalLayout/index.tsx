import {Layout} from "antd";
import React from "react";


import {Outlet} from "react-router-dom";


const {Content} = Layout;

export default function TerminalLayout() {


    return (
        <Layout>
            <Content>
                <Outlet/>
            </Content>
        </Layout>
    )
}