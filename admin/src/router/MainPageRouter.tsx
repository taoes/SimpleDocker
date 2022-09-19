import AboutPage from "../page/AboutPage";
import AuthPage from "../page/AuthPage";
import ContainerLogPage from "../page/ContainerLogPage";
import ContainerPage from "../page/ContainerPage";
import ContainerStatPage from "../page/ContainerStatPage";
import CreateContainerPage from "../page/CreateContainerPage";
import HomePage from "../page/HomePage";
import ImagePage from "../page/ImagePage";
import ImagePullPage from "../page/ImagePullPage";
import MonitorPage from "../page/MonitorPage";
import NetworkPage from "../page/NetworkPage";
import SettingPage from "../page/SettingPage";
import VolumePage from "../page/VolumePage";
import AppRouter from "./AppRouter";
import TemplatePage from "../page/TemplatePage";


export const appRouter: Array<AppRouter> = [
    {
        path: '/app/home',
        component: <HomePage/>,
        exact: true
    },
    {
        path: '/app/image',
        component: <ImagePage/>,
        exact: true
    },

    {
        path: '/app/image/pull',
        component: <ImagePullPage/>,
        exact: true
    },
    {
        path: '/app/container',
        component: <ContainerPage/>,
        exact: true
    },
    {
        path: '/app/container/:containerId/log',
        component: <ContainerLogPage/>,
        exact: true
    },
    {
        path: '/app/container/:containerId/stat',
        component: <ContainerStatPage/>
    },


    {
        path: '/app/volume',
        component: <VolumePage/>,
        exact: true
    },
    {
        path: '/app/network',
        component: <NetworkPage/>,
        exact: true
    },
    {
        path: '/app/template',
        component: <TemplatePage/>,
        exact: true
    },
    {
        path: '/app/monitor',
        component: <MonitorPage/>,
        exact: true
    },
    {
        path: '/app/setting',
        component: <SettingPage/>,
        exact: true
    },
    {
        path: '/app/auth',
        component: <AuthPage/>,
        exact: true
    },
    {
        path: '/app/about',
        component: <AboutPage/>,
        exact: true
    }, {
        path: '/app/image/:imageId/run',
        component: <CreateContainerPage/>,
        exact: true
    }
]

export default appRouter