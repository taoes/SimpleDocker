import React from 'react';
import ReactDOM from 'react-dom';

// 引入 antd css 样式
import 'antd/dist/antd.css';
import './index.css';

import {Layout} from 'antd'
import CommonMenu from "./components/CommonMenu";
import CommonFooter from "./components/CommonFooter";
import CommonHead from "./components/CommonHead/index";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ContainerPage from "./page/ContainerPage";
import ImagePage from "./page/ImagePage";
import HomePage from "./page/HomePage/index";
import VolumePage from "./page/VolumePage";
import NetworkPage from "./page/NetWorkPage";

const {Content, Footer, Header, Sider} = Layout


ReactDOM.render(
        <BrowserRouter>
            <Layout>
                {/*标题头*/}
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
        </BrowserRouter>,
    document.getElementById('root')
)
;

