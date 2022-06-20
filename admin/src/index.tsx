import React from 'react';
import ReactDOM from 'react-dom/client';


import {HashRouter, Route, Routes} from "react-router-dom";
import LoginLayout from "./layout/LoginLayout";
import MainLayout from "./layout/MainLayout";

import appRouter from './router/mainPageRouter'

import './index.css';
import TerminalLayout from "./layout/TerminalLayout";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginLayout/>}/>
        <Route path="/login" element={<LoginLayout/>}/>
        <Route path="/terminal" element={<TerminalLayout/>}/>
        <Route path="/app" element={<MainLayout/>}>
          {
            appRouter.map(({path, component}) => <Route key={path} path={path} element={component}/>)
          }
        </Route>

      </Routes>
    </HashRouter>,
);