import {Descriptions} from "antd";
import React from "react";

interface Config {
    name: string
    value: string
}


interface Props {
}

interface State {

}


class SimpleDockerVersionDescription extends React.Component<Props, State> {

    private readonly configs: Array<Config>

    constructor(props: Props) {
        super(props);

        this.configs = [
            {name: '服务端版本', value: 'Java 1.8'},
            {name: '客户端构建', value: 'React'},
            {name: '服务端版本', value: 'JDK8.0'},
            {name: '服务端版本', value: 'JDK8.0'},
        ]

    }


    render() {
        let items = []

        for (let config of this.configs) {
            let {name, value} = config
            items.push(
                <Descriptions.Item
                    label={name}
                    labelStyle={{fontWeight: 500}}
                    key={name}>{value}
                </Descriptions.Item>
            )
        }

        return (
            <div className="box mt-2">
                <Descriptions
                    bordered
                    size="small"
                    title="SimpleDocker 应用信息">
                    {items}
                </Descriptions>
            </div>
        )
    }
}

export default SimpleDockerVersionDescription;