import React from 'react'
import {message, Button, Modal, Divider} from "antd";
import {inspect, operator as operatorContainer} from "../../../api/container";
import ContainerProcess from "../process";
import './index.css'
import _ from 'lodash'

const {operatorMap} = require('../../../config/containerStatus')


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            process: false, // 显示容器进程信息
            container: null
        }
        // 获取容器信息
        this.inspectContainer()
    }


    // 获取容器信息
    inspectContainer() {
        inspect(this.state.id)
            .then((resp) => {
                let {data: container} = resp.data
                console.log(container)
                this.setState({container})
            }).catch()
    }

    // 显示容器进程
    showProcess = () => {
        this.setState({process: true})
    }


    // 操作容器
    // 操作容器
    operatorContainer = (operator) => {
        let key = `${operator}-${this.state.id}`
        message.loading({content: `正在${operatorMap.get(operator)}容器,请稍后`, key});

        operatorContainer(this.state.id, operator).then(r => {
            message.info({content: `${operatorMap.get(operator)}容器完成!`, key, duration: 3})
        }).catch((error) => {
            message.error({content: `${operatorMap.get(operator)}容器失败,错误信息:${JSON.stringify(error)}`, key, duration: 3})
        });
    }

    render() {
        var running = _.get(this.state.container, "State.Running", false);

        // 一些仅仅在容器运行时可用的功能
        let btnOnlyRunning =
            <div>
                <Divider>容器运行时操作</Divider>
                <Button type="primary" className="btn" onClick={this.showProcess} disabled={!running}>容器进程</Button>
                <Button type="primary" className="btn" onClick={() => message.info("开发中")} disabled={!running}>容器终端</Button>
                <Button type="primary" className="btn" onClick={() => message.info("开发中")} disabled={!running}>文件管理</Button>
            </div>

        // 容器基本操作
        let btnOfBasic =
            <div>
                <Divider>容器基础操作</Divider>

                <Button type="primary" className="btn" onClick={() => this.operatorContainer('START')}
                        disabled={running}>
                    启动容器
                </Button>


                <Button type="primary" className="btn" onClick={() => this.operatorContainer('PAUSE')}
                        disabled={!running}>
                    暂停容器
                </Button>


                <Button type="primary" className="btn" onClick={() => this.operatorContainer('REMOVE')} danger>
                    删除容器
                </Button>

                <Button type="primary" className="btn" onClick={() => message.warning("暂未实现")}>
                    复制容器
                </Button>

                <Button type="primary" className="btn" onClick={() => message.warning("暂未实现")}>
                    导出容器
                </Button>
            </div>

        return (
            <div>
                <div>

                    {
                        // 容器基础操作
                        btnOfBasic
                    }

                    {
                        // 进程展示按钮
                        btnOnlyRunning
                    }


                    <Divider>容器配置</Divider>

                    <Button type="primary" className="btn" onClick={() => message.info("开发中")}>
                        连接网络
                    </Button>

                    <Button type="primary" className="btn" onClick={() => message.info("开发中")}>
                        系统监控
                    </Button>


                </div>
                <Modal
                    visible={this.state.process}
                    title="容器进程"
                    footer={null}
                    width={1024}
                    destroyOnClose={true}
                    onCancel={() => this.setState({process: false})}>
                    <ContainerProcess containerId={this.state.id}/>
                </Modal>
            </div>
        );
    }
}
