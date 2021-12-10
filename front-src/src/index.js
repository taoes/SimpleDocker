import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";


import {Layout} from 'antd'
import CommonMenu from "./components/CommonMenu";
import CommonFooter from "./components/CommonFooter";
import CommonHead from "./components/CommonHead/index";


// 导入页面
import ContainerPage from "./page/container/index";
import ImagePage from "./page/image/index";
import HomePage from "./page/home/index";
import VolumePage from "./page/volume/index";
import NetworkPage from "./page/network/index";


// 引入 antd css 样式
import 'antd/dist/antd.css';
import './index.css';

const {Content, Footer, Header, Sider} = Layout


ReactDOM.render(
    <HashRouter>
        <Layout>
            <Header>
                <CommonHead/>
            </Header>

            <Layout>
                <Sider>
                    <CommonMenu/>
                </Sider>
                <Content>
                    {/*路由布局*/}
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/image" element={<ImagePage/>}/>
                        <Route path="/container" element={<ContainerPage/>}/>
                        <Route path="/volume" element={<VolumePage/>}/>
                        <Route path="/network" element={<NetworkPage/>}/>
                    </Routes>
                </Content>
            </Layout>
            <Footer>
                <CommonFooter/>
            </Footer>

        </Layout>
    </HashRouter>,
    document.getElementById('root')
)
;

