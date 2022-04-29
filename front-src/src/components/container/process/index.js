import React from 'react'
import {Table} from "antd";
import {top} from "../../../api/Container";
import './index.css'

export default class ContainerProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            process: [],
            intervalId: null
        }
    }

    // 启动定时器刷新容器进程
    componentDidMount() {
        // 进入之后立即刷新一次，然后定时刷新
        this.refreshProcess().then();
        let intervalId = setInterval(this.refreshProcess, 2000)
        this.setState({intervalId})
    }

    componentWillUnmount() {
        if (!!this.state.intervalId) {
            clearInterval(this.state.intervalId)
        }
    }

    refreshProcess = async () => {
        let {data} = await top(this.props.containerId, "")
        let {Titles, Processes} = data
        if (!Titles || !Processes) {
            this.setState({columns: [], process: []})
            return
        }

        var columns = []
        var process = []

        Titles.forEach(t => {
            columns.push({title: t, dataIndex: t, key: t})
        });

        Processes.forEach(p => {
            let e = new Map()
            for (let i = 0; i < p.length; i++) {
                e[Titles[i]] = p[i]
            }
            process.push(e)
        });

        this.setState({columns, process})
    }


    render() {
        return (
            <div>
                <Table
                    bordered
                    pagination={false}
                    size="small"
                    wrapClassName={'processTable'}
                    columns={this.state.columns}
                    dataSource={this.state.process}/>
            </div>
        );
    }

}
