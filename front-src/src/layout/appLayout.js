import React from 'react';
import {Outlet} from "react-router-dom";


import {Layout} from 'antd'
import CommonMenu from "../components/CommonMenu";
import CommonFooter from "../components/CommonFooter";
import CommonHead from "../components/CommonHead/index";


import './appLayout.css';

const {Content, Footer, Header, Sider} = Layout


export default class AppLayout extends React.Component {
    render() {
        return (
            <Layout style={{minHeight: '100%'}}>
                <Header>
                    <CommonHead/>
                </Header>

                <Layout>
                    <Sider>
                        <CommonMenu/>
                    </Sider>
                    <Content>
                        <Outlet/>
                    </Content>
                </Layout>
                <Footer>
                    <CommonFooter/>
                </Footer>
            </Layout>

        );
    }
}



