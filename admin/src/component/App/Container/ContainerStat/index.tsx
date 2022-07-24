import { Button } from "antd";
import React from "react";
import { RouterProps } from "react-router";
import WithRouter from "../../../../router/WithRouter";
import './index.css'


interface Props {
    containerId: string
    router: RouterProps
}

interface State {

}

class ContainerStat extends React.Component<Props, State>{

    private containerId: string = ""


    constructor(prop: Props) {
        super(prop);
        this.containerId = prop.containerId;
        this.state = {

        }
    }

    back = () => {
        // @ts-ignore
        this.props.router.navigate(-1)
    }

    render() {
        return (
            <span>
                <Button onClick={this.back}>返回</Button>
            </span>
        )
    }
}

export default WithRouter(ContainerStat);