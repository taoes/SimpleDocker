import AppRouter from "./AppRouter";
import ImagePage from "../page/ImagePage";
import ContainerPage from "../page/ContainerPage";
import VolumePage from "../page/VolumePage";
import NetworkPage from "../page/NetworkPage";
import HomePage from "../page/HomePage";
import MonitorPage from "../page/MonitorPage";
import SettingPage from "../page/SettingPage";
import UserPage from "../page/AuthPage";
import AboutPage from "../page/AboutPage";
import CreateContainerPage from "../page/CreateContainerPage";
import ContainerLogPage from "../page/ContainerLogPage";
import ContainerTerminal from "../page/ContainerTerminal";


export const terminalRouter: Array<AppRouter> = [

  {
    path: '/terminal/container/:containerId/client/:clientId',
    component: <ContainerTerminal/>,
    exact: true
  }
]

export default terminalRouter