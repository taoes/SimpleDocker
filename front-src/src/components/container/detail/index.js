import React from 'react'
import ReactJson from "react-json-view";

import {inspect} from "../../../api/Container";
import { Spin} from "antd";

/**
 * 容器详情组件
 */
export default class ContainerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerId: this.props.containerId,
            container: null
        }
    }


    componentDidMount() {
        this.inspect()
    }


    inspect = () => {
        inspect(this.state.containerId)
            .then((resp) => {
                console.log(resp.data)
                this.setState({container: resp.data})
            })
    }

    render() {
        let loading = this.state.container === null;
        return (
            <div>
                <Spin spinning={loading}>
                    <ReactJson
                        src={this.state.container}
                        displayDataTypes={false}
                        style={{overflow: 'auto'}}
                        collapsed={1}/>
                </Spin>
            </div>
        );
    }

}
