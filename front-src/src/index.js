import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";


// 导入页面

import AppLayout from "./layout/appLayout";


// 引入 antd css 样式
import 'antd/dist/antd.css';
import './layout/appLayout.css';


import LoginLayout from "./layout/loginLayout";
import appRouter from "./router/app";


ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/app" element={<AppLayout/>}>
                {
                    appRouter.map(({path, component}) => <Route key={path} path={path} element={component}/>)
                }
            </Route>
            <Route path="/login" element={<LoginLayout/>}/>
            <Route path="/" element={<LoginLayout/>}/>
        </Routes>
    </HashRouter>,
    document.getElementById('root')
);



