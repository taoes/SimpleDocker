import { Button, Col, Empty, PageHeader, Row } from "antd";
import React from "react";
import { RouterProps } from "react-router";
import WithRouter from "../../../../router/WithRouter";
import './index.css'
import _ from 'lodash'
import * as echarts from 'echarts';
import { ContainerStatInfo } from "./model";
import { formatterTime } from "../../../../utils/DateTime";
import { memoryStst, cpuCoreStat, cpuUsageLineStat, memoryUsageCountStat, memoryUsageRateStat, netLineStat } from './data'
import { FifoCache } from "../../../../utils/FifoArray";


interface Props {
    containerId: string
    router: RouterProps
    param: RouterProps
}

interface State {
    pause: boolean
}



class ContainerStat extends React.Component<Props, State>{

    private containerId: string = ""

    private charts: Array<echarts.EChartsType> = []

    private ws: WebSocket | undefined = undefined


    private cpuRateData: FifoCache<string, string>;
    private memoryRateData: FifoCache<string, string>;
    private memoryCountData: FifoCache<string, string>;

    constructor(prop: Props) {
        super(prop);
        // @ts-ignore
        this.containerId = prop.router.params.containerId;
        this.memoryRateData = new FifoCache(40);
        this.memoryCountData = new FifoCache(40);
        this.cpuRateData = new FifoCache(40);
        this.state = {
            pause: false
        }
    }

    componentDidMount() {

        // @ts-ignore
        let memory = echarts.init(document.getElementById('memoryUsageChart'))

        //@ts-ignore
        let cpuCore = echarts.init(document.getElementById('cpuCoreChart'))

        //@ts-ignore
        let cpuLineUsage = echarts.init(document.getElementById('cpuUsageChart'))

        //@ts-ignore
        let memoryUsageRateChart = echarts.init(document.getElementById('memoryUsageRateChart'))

        //@ts-ignore
        let memoryUsageCountChart = echarts.init(document.getElementById('memoryUsageCountChart'))

        //@ts-ignore
        let netLineUsage = echarts.init(document.getElementById('networkLineUsageChart'))



        memory.setOption(memoryStst)
        cpuCore.setOption(cpuCoreStat)
        cpuLineUsage.setOption(cpuUsageLineStat)
        memoryUsageRateChart.setOption(memoryUsageRateStat)
        memoryUsageCountChart.setOption(memoryUsageCountStat)
        netLineUsage.setOption(netLineStat)

        this.charts[0] = memory
        this.charts[1] = cpuCore
        this.charts[2] = cpuLineUsage
        this.charts[3] = memoryUsageRateChart
        this.charts[4] = memoryUsageCountChart
        this.charts[5] = netLineUsage



        // 加载数据
        let WS_URL_PREFIX = process.env.REACT_APP_WS_URL
        let clientId = localStorage.getItem('clientId')
        let wsUrl = `${WS_URL_PREFIX}/api/ws/client/${clientId}/container/${this.containerId}/monitor`
        // 创建 socket 连接

        this.ws = new WebSocket(wsUrl);
        this.ws.onmessage = this.onMessage;//WebSorkt通知
        this.ws.onerror = this.onError;//WebSorkt异常
        this.ws.onclose = this.onClose;//WebSorkt关闭


    }

    componentWillUnmount() {
        if (this.ws) {
            this.ws.close()
        }
    }

    switchStateData = () => {
        this.setState({
            pause: !this.state.pause
        })
    }


    onMessage = (wsData: MessageEvent<string>): any => {
        if (this.state.pause) {
            return
        }

        let data = wsData.data
        let stats: ContainerStatInfo = JSON.parse(data)
        let key = formatterTime(new Date())

        let cpuTotalUsage = _.get(stats, 'cpu_stats.cpu_usage.total_usage', 10)
        let preCpuTotalUsage = _.get(stats, 'precpu_stats.cpu_usage.total_usage', 0)
        let cpuDelta = cpuTotalUsage - preCpuTotalUsage

        let systemCpuTotalUsage = _.get(stats, 'cpu_stats.system_cpu_usage', 0)
        let preSystemCpuTotalUsage = _.get(stats, 'precpu_stats.system_cpu_usage', 0)
        let preSystemCpuDelta = systemCpuTotalUsage - preSystemCpuTotalUsage

        let numberCpu = _.get(stats, "cpu_stats.online_cpus", 1)

        let usageRate = 0;
        if (preSystemCpuTotalUsage !== 0) {
            usageRate = (cpuDelta / preSystemCpuDelta) * numberCpu * 100
        }

        // 内存使用率
        let memoryUsageRate: number = (stats.memory_stats.usage / stats.memory_stats.limit) * 100;
        let memoryUsageCount: number = (stats.memory_stats.usage / 1024);
        this.charts[0].setOption({
            series: [
                {
                    data: [
                        {
                            value: usageRate.toFixed(2),
                            name: '使用率'
                        }
                    ]
                }

            ]
        })


        // CPU 核心数
        this.charts[1].setOption({
            series: [
                {
                    data: [
                        {
                            value: stats.cpu_stats.online_cpus,
                            name: '核心数'
                        }
                    ]
                }

            ]
        })

        // CPU 区域限
        this.cpuRateData.set(key, usageRate + "")
        this.charts[2].setOption({
            xAxis: {
                data: this.cpuRateData.getKeys()
            },
            series: [
                {
                    data: this.cpuRateData.getValues()
                }
            ]
        })


        // 内存曲线记录
        this.memoryCountData.set(key, memoryUsageCount.toFixed(3))
        this.memoryRateData.set(key, memoryUsageRate.toFixed(3))
        this.charts[3].setOption({
            xAxis: {
                data: this.memoryRateData.getKeys()
            },
            series: [
                {
                    data: this.memoryRateData.getValues()
                }
            ]
        })
        this.charts[4].setOption({
            xAxis: {
                data: this.memoryCountData.getKeys()
            },
            series: [
                {
                    data: this.memoryCountData.getValues()
                }
            ]
        })
    }

    //ws异常监听
    onError = () => {
        console.log("websocket发生异常,3秒后重连========");
    }

    onClose = () => {
        console.log("websocket关闭========");
    }


    back = () => {
        // @ts-ignore
        this.props.router.navigate(-1)
    }

    render() {
        return (
            <PageHeader className="site-page-header"

                onBack={this.back}
                title="返回容器列表"
                subTitle="查看容器Stat数据信息"
                extra={[
                    <Button key="3">刷新</Button>,
                    <Button key="1" type="primary" onClick={this.switchStateData}>
                        {
                            this.state.pause ? "继续" : "暂停"
                        }
                    </Button>,
                ]}
            >

                <div style={{ overflow: 'auto', height: '700px' }}>
                    <Row>

                        <Col span={6} className="box">
                            <div id="memoryUsageChart" style={{ height: 300 }}></div>
                        </Col>


                        <Col span={6} className="box">
                            <div id="cpuCoreChart" style={{ height: 300 }}></div>
                        </Col>


                        <Col span={12} className="box">
                            <div id="cpuUsageChart" style={{ height: 300 }}></div>
                        </Col>


                    </Row>


                    <Row className="mt-4">
                        <Col span={12} className="box">
                            <div id="memoryUsageRateChart" style={{ height: 300 }}></div>
                        </Col>

                        <Col span={12} className="box">
                            <div id="memoryUsageCountChart" style={{ height: 300 }}></div>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col span={12} className="box">
                            <div id="networkLineUsageChart" style={{ height: 300 }}></div>
                        </Col>

                        <Col span={12} className="box">
                            <div id="2networkLineUsageChart" style={{ height: 300 }}></div>
                        </Col>
                    </Row>
                </div>
            </PageHeader >
        )
    }
}

export default WithRouter(ContainerStat);