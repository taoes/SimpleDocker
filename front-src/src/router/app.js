import ImagePage from "../page/image";
import HomePage from "../page/home";
import VolumePage from "../page/volume";
import NetworkPage from "../page/network";
import ContainerPage from "../page/container";
import React from "react";
import AuthRouter from "./AuthRouter";

const appRouter = [
    {
        path: '/app',
        component: <AuthRouter><HomePage/></AuthRouter>,
        exact: true,
    },
    {
        path: '/app/image',
        component: <AuthRouter><ImagePage/></AuthRouter>,
        exact: true,
    },
    {
        path: '/app/container',
        component: <AuthRouter><ContainerPage/></AuthRouter>,
        exact: true,
    },
    {
        path: '/app/volume',
        component: <AuthRouter><VolumePage/></AuthRouter>,
        exact: true,
    },
    {
        path: '/app/network',
        component: <AuthRouter><NetworkPage/></AuthRouter>,
        exact: true,
    }
]


export default appRouter;
