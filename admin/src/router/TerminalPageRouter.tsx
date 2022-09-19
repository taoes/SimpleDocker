import AppRouter from "./AppRouter";
import ContainerTerminal from "../page/ContainerTerminal";


export const terminalRouter: Array<AppRouter> = [

    {
        path: '/terminal/container/:containerId/client/:clientId',
        component: <ContainerTerminal/>,
        exact: true
    }
]

export default terminalRouter