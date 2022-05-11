import AppRouter from "./AppRouter";
import ImagePage from "../page/ImagePage";
import ContainerPage from "../page/ContainerPage";
import VolumePage from "../page/VolumePage";
import NetworkPage from "../page/NetworkPage";
import HomePage from "../page/HomePage";
import MonitorPage from "../page/MonitorPage";
import SettingPage from "../page/SettingPage";


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
        path: '/app/container',
        component: <ContainerPage/>,
        exact: true
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
        path: '/app/monitor',
        component: <MonitorPage/>,
        exact: true
    },
    {
        path: '/app/setting',
        component: <SettingPage/>,
        exact: true
    }
]

export default appRouter