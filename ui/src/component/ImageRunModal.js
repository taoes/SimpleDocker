import { Checkbox, Form, Input, Modal, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import modalSlice from "../store/modalSlice";
import { DockerOutlined, DatabaseOutlined, NodeIndexOutlined, ApiOutlined } from '@ant-design/icons';
import { useState } from "react";


export default function ImageRunModal() {

    const dispatch = useDispatch();
    const { switchImageRunModalStatus } = modalSlice.actions;
    const { imageRunModalStatus } = useSelector(state => state.modal);
    const [itemIndex, setItemIndex] = useState(0)


    const onStemItemChange = (current) => {
        setItemIndex(current)
    }

    const onOk = () => {
        // todo submit
        dispatch(switchImageRunModalStatus())
    }

    const onCancel = () => {
        dispatch(switchImageRunModalStatus())
    }


    return (
        <Modal open={imageRunModalStatus}
            onOk={onOk}
            onCancel={onCancel}
            okText="提交"
            cancelText="取消"
            title="运行新的容器"
            width={"50%"}
            height={600}
            closeIcon>
            <Steps
                items={[
                    {
                        title: '基础信息',
                        status: 'wait',
                        icon: <DockerOutlined />,
                    },
                    {
                        title: '存储配置',
                        status: 'wait',
                        icon: <DatabaseOutlined />,
                    },
                    {
                        title: '端口映射',
                        status: 'wait',
                        icon: <NodeIndexOutlined />,
                    },
                    {
                        title: '网络连接',
                        status: 'wait',
                        icon: <ApiOutlined />,
                    },
                ]}
                current={itemIndex}
                onChange={onStemItemChange}
            />
            <Form>
                <Form.Item>
                    <Input placeholder="镜像名称" />
                </Form.Item>


                <Form.Item>
                    <Input placeholder="请输入容器名称" />
                </Form.Item>


                <Form.Item>
                    <Input placeholder="请输入启动命令" />
                </Form.Item>

                <Form>
                    <Checkbox>容器停止时自动重启</Checkbox>
                </Form>

            </Form>
        </Modal>
    )
}



