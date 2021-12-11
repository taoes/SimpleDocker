import React, {lazy} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";


// 导入页面

import AppLayout from "./layout/appLayout";


// 引入 antd css 样式
import 'antd/dist/antd.css';
import './layout/appLayout.css';


import HomePage from "./page/home"
import ImagePage from "./page/image";
import ContainerPage from "./page/container";
import VolumePage from "./page/volume";
import NetworkPage from "./page/network";
import LoginLayout from "./layout/loginLayout";
import {Suspense} from "react";


ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/app" element={<AppLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/app/image" element={<ImagePage/>}/>
                <Route path="/app/container" element={<ContainerPage/>}/>
                <Route path="/app/volume" element={<VolumePage/>}/>
                <Route path="/app/network" element={<NetworkPage/>}/>
            </Route>
            <Route path="/login" element={<LoginLayout/>}/>
            <Route path="/" element={<LoginLayout/>}/>
        </Routes>
    </HashRouter>,
    document.getElementById('root')
)
;

