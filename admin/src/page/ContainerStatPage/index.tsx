import React from "react";
import ContainerStat from "../../component/App/Container/ContainerStat";
import WithRouter from "../../router/WithRouter";


class ContainerStatPage extends React.Component<any, any>{

    render() {
        return (
            <div id="containerStatPage">
                <div id="containerStatPageCtl">

                </div>

                <div id="containerStatPageContent">
                    <ContainerStat containerId="2" />
                </div>
            </div>
        )
    }
}

export default WithRouter(ContainerStatPage);