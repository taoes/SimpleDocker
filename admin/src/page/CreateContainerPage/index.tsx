// 创建容器向导


import {Button, Form, Input, PageHeader, Space, Steps, Table,message} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {getImageDetail} from "../../api/Image/ImageApi";
import dateToStr from "../../utils/Time";
import type {FormInstance} from 'antd/es/form';
import bytesToSize from "../../utils/ByteSize";



const {Step} = Steps;


interface VolumeConfig {
    container: string

    type: string
    host: string
    volumeId: string
}



const volumeColumns: ColumnsType<VolumeConfig> = [
    {
        title: '容器目录',
        dataIndex: 'container',
        key: 'Id',
        render: container => <span>{container}</span>,
        ellipsis: true,
        width: 150,
    },
    {
        title: '存储类型',
        dataIndex: 'type',
        render: type => <span>{type}</span>,
        ellipsis: true,
        width: 150,
    }, {
        title: '宿主机目录',
        dataIndex: 'host',
        render: host => <span>{host}</span>,
        ellipsis: true,
        width: 150,
    }, {
        title: '储存卷',
        dataIndex: 'volumeId',
        render: volumeId => <span>{volumeId}</span>,
        ellipsis: true,
        width: 150,
    }, {
        title: '操作',
        dataIndex: 'container',
        key: 'Id',
        render: (_, record: VolumeConfig) => {
            return <Space>
                <Button>删除</Button>
                <Button>修改</Button>
            </Space>
        },
        ellipsis: true,
        width: 150,
    }
]




export default function CreateContainerPage() {
    const {imageId} = useParams<{ imageId: string }>();

    let navigate = useNavigate();
    let [currentStep, setCurrentStep] = useState<number>(0)
    let [volumeDatasource, setVolumeDatasource] = useState([])


    let formRef = React.createRef<FormInstance>();
    useEffect(() => {
        getImageDetail(imageId).then(data => {
            let newData = {
                imageId: data.Id,
                imageTag: data.RepoTags.toString(),
                buildTime: dateToStr(data.Created),
                maintainer: "紫荆皮压迫",
                architecture: data.Architecture,
                workDir: data.Config.WorkingDir,
                cmd: data.Config.Cmd.toString(),
                size: bytesToSize(data.Size) + "/" + bytesToSize(data.VirtualSize)


            }
            formRef.current!.setFieldsValue(newData);
        })
    }, [])


    function changeStep(current: number) {
        setCurrentStep(current)
    }


    /**
     * 切换容器创建的模式
     */
    function changeCreateMode(){
        message.error('很抱歉，该功能正在开发中，暂时实现').then(r => {});
    }


    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title="容器创建向导"
                subTitle={"使用容器创建工具创建新的容器"}
                extra={<Button type="primary" onClick={changeCreateMode}>专家模式</Button>}
            />
            <div className={"box"}>
                <Steps current={currentStep} onChange={(current) => changeStep(current)}>
                    <Step title="基础信息"/>

                    <Step title="存储配置"/>

                    <Step title="网络配置"/>

                    <Step title="资源配置"/>

                    <Step title="创建容器"/>
                </Steps>

                <div id="container" className="m-4 p-3">
                    <Form
                        name="basic"
                        labelCol={{span: 2}}
                        wrapperCol={{span: 22}}
                        ref={formRef}
                        autoComplete="off">
                        <div style={{display: currentStep == 0 ? 'block' : 'none'}}>
                            <Form.Item label="镜像标识" name="imageId">
                                <Input readOnly={true}/>
                            </Form.Item>

                            <Form.Item label="镜像标签" name="imageTag">
                                <Input readOnly={true}/>
                            </Form.Item>

                            <Form.Item label="构建时间" name="buildTime">
                                <Input readOnly={true}/>
                            </Form.Item>

                            <Form.Item label="容器架构" name="architecture">
                                <Input readOnly={true}/>
                            </Form.Item>

                            <Form.Item label="维护人员" name="maintainer">
                                <Input readOnly={true}/>
                            </Form.Item>


                            <Form.Item label="镜像大小" name="size">
                                <Input readOnly={true}/>
                            </Form.Item>


                            <Form.Item label="工作目录" name="workDir">
                                <Input readOnly={true}/>
                            </Form.Item>

                            <Form.Item label="启动命令" name="cmd">
                                <Input readOnly={true}/>
                            </Form.Item>
                        </div>

                        <div style={{display: currentStep == 1 ? 'block' : 'none'}}>
                            <Table columns={volumeColumns} dataSource={volumeDatasource} size={"small"}/>
                        </div>


                        <div style={{display: currentStep == 2 ? 'block' : 'none'}}>

                            <Form.Item label="主机名">
                                <Input/>
                            </Form.Item>

                            <Form.Item label="DNS地址">
                                <Input/>
                            </Form.Item>

                            <Form.Item label="CPU使用">
                                <Input/>
                            </Form.Item>

                            <Form.Item label="内存使用">
                                <Input/>
                            </Form.Item>

                            <Form.Item label="容器别名">
                                <Input/>
                            </Form.Item>
                        </div>


                        <div style={{display: currentStep == 3 ? 'block' : 'none'}}>
                            资源
                        </div>

                        <div style={{display: currentStep == 4 ? 'block' : 'none'}}>


                            <Form.Item label="容器别名" name="alias">
                                <Input readOnly={true}/>
                            </Form.Item>


                            创建
                        </div>
                    </Form>
                </div>
            </div>


        </div>
    )
}