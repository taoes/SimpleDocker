import React from "react";
import {message, Spin} from "antd";

import {inspect} from "../../../api/ImageApi";
import ReactJson from 'react-json-view'


export default class ImageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailLoading: true,
            detail: {}
        }
    }

    componentDidMount() {
        this.inspect()
    }

    inspect = () => {
        this.setState({detailLoading: true})
        let {imageId} = this.props
        inspect(imageId)
            .then((resp) => {
                this.setState({detail: resp.data, detailLoading: false})
            })
            .catch(() => {
                message.info("获取容器信息失败，请检查服务")
                this.setState({detail: {}, detailLoading: false})
            });
    }


    render() {
        return (
            <Spin spinning={this.state.detailLoading}>
                <ReactJson src={this.state.detail}
                           displayDataTypes={false}
                           style={{overflow: 'auto'}} collapsed={1}/>
            </Spin>
        );
    }

}
