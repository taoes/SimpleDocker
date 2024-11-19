import { Descriptions, Badge, Row, Col, Statistic,Card } from "antd";
import {PieChartOutlined,DesktopOutlined,DockerOutlined,CodeOutlined} from '@ant-design/icons'
import { useSelector } from "react-redux";
import { Overlay } from "antd/es/popconfirm/PurePanel";


export default function SummaryPage() {
    const {host,docker} = useSelector(state=>state.docker)
    const items = [
        {
            key: '1',
            label: '处理器',
            children: 'Inter(R) Core(TM) i7-4700MQ CPU @ 2.5GHz',
        },
        {
            key: '2',
            label: '磁盘',
            children: 'Prepaid',
        },
        {
            key: '3',
            label: '内存',
            children: 'YES',
        },
        {
            key: '4',
            label: '系统时间',
            children: '2018-04-24 18:00:00',
        },
        {
            key: '5',
            label: 'Docker 启动时间',
            children: '2019-04-24 18:00:00',
            span: 2,
        },
        {
            key: '6',
            label: 'Docker 状态',
            children: <Badge status="processing" text="运行中" />,
            span: 3,
        },
        {
            key: '7',
            label: '操作系统',
            children: '$80.00',
        },
        {
            key: '8',
            label: 'Discount',
            children: '$20.00',
        },
        {
            key: '9',
            label: 'Official Receipts',
            children: '$60.00',
        },
        {
            key: '10',
            label: 'Config Info',
            children: (
                <>
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1
                    <br />
                </>
            ),
        },
    ];


    const dockerInfo = [
        {
            key: '1',
            label: '镜像数量',
            children: 'Inter(R) Core(TM) i7-4700MQ CPU @ 2.5GHz',
        },
        {
            key: '2',
            label: '容器数量',
            children: 'Prepaid',
        },
        {
            key: '3',
            label: '磁盘占用',
            children: 'YES',
        },
        {
            key: '4',
            label: '系统时间',
            children: '2018-04-24 18:00:00',
        },
        {
            key: '5',
            label: 'Docker 启动时间',
            children: '2019-04-24 18:00:00',
            span: 2,
        },
        {
            key: '7',
            label: '容器总数量',
            children: '$80.00',
        },
        {
            key: '8',
            label: '镜像总数量',
            children: '$20.00',
        },
        {
            key: '9',
            label: 'Docker目录',
            children: '$60.00',
        },
        {
            key: '10',
            label: '容器数量',
            children: (
                <>
                    总数: MongoDB
                    <br />
                    ContainersRunning: 3.4
                    <br />
                    ContainersPaused: dds.mongo.mid
                    <br />
                    ContainersStopped: 10 GB
                </>
            ),
        },
    ];


    const summaryPageStyle ={
        
    }

    return (
        <div id="summaryPage" style={summaryPageStyle}>
            <Row gutter={24} style={{padding:10}}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="镜像数量"
                            value={docker.imageCount}
                            
                            prefix={<DockerOutlined/>}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="运行中容器"
                            value={docker.containerCount}
                            
                            prefix={<CodeOutlined/>}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="处理器核数"
                            value={host.cpuCore}
                            prefix={<DesktopOutlined />}
                            
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="系统内存(M)"
                            value={host.memory}
                            
                            prefix={<PieChartOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Descriptions title="宿主机信息" bordered items={items} size="small" />
            <Descriptions title="Docker信息" bordered items={dockerInfo} size="small" />
        </div>
    )
}