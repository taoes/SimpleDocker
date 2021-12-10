import React from 'react'
import {Steps} from "antd";
import {BuildOutlined, EnvironmentOutlined, HddOutlined, InfoCircleOutlined, WifiOutlined} from "@ant-design/icons";


const {Step} = Steps;

class RunNewContainerStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
    }


    onStepChange = current => {
        this.setState({current});
    };

    render() {
        return (
            <div>
                <Steps current={this.state.current} onChange={this.onStepChange}>
                    <Step title="基础信息" icon={<InfoCircleOutlined/>}/>
                    <Step title="存储配置" icon={<HddOutlined/>}/>
                    <Step title="网络配置" icon={<WifiOutlined/>}/>
                    <Step title="环境变量" icon={<EnvironmentOutlined/>}/>
                    <Step title="创建容器" icon={<BuildOutlined/>}/>
                </Steps>,
            </div>
        );
    }

}

export default RunNewContainerStep;
