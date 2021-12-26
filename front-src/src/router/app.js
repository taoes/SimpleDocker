import ImagePage from "../page/image";
import HomePage from "../page/home";
import VolumePage from "../page/volume";
import NetworkPage from "../page/network";
import ContainerPage from "../page/container";
import React from "react";
import AuthRouter from "./AuthRouter";
import MonitPage from "../page/security/monit";
import NotificationPage from "../page/security/notification";
import UserPage from "../page/security/user";
import DockerPage from "../page/security/docker";
import RegistryPage from "../page/security/registry";

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
    },
    {
        path: '/app/monitor',
        component: <AuthRouter><MonitPage/></AuthRouter>,
        exact: true,
    }, {
        path: '/app/notification',
        component: <AuthRouter><NotificationPage/></AuthRouter>,
        exact: true,
    }, {
        path: '/app/user',
        component: <AuthRouter><UserPage/></AuthRouter>,
        exact: true,
    }, {
        path: '/app/docker',
        component: <AuthRouter><DockerPage/></AuthRouter>,
        exact: true,
    }, {
        path: '/app/registry',
        component: <AuthRouter><RegistryPage/></AuthRouter>,
        exact: true,
    }
]


export default appRouter;
