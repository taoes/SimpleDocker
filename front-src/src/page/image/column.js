import {Button, Space, Tag} from "antd";
import bytesToSize from "../../utils/ByteSize";
import formatDate from "../../utils/DateTime";
import React from "react";

const columns = [
        {
            title: '容器ID',
            dataIndex: 'Id',
            key: 'name',
            render: id => <span>{!!id && id.substring(0, 30).replaceAll("sha256:", '')}</span>,
            ellipsis: true,
            width: 150,
        },
        {
            title: '镜像标签',
            dataIndex: 'RepoTags',
            render: RepoTags => {

                if (!RepoTags) {
                    return null
                }
                return RepoTags.map(t => {
                    let color = 'blue'
                    if (t.indexOf('none') !== -1) {
                        color = 'red'
                    } else if (t.indexOf('latest') !== -1) {
                        color = 'green'
                    }
                    return <Tag key={t} color={color}>{t}</Tag>
                })
            },
            key: 'Size',
            width: 700,
        },
        {
            title: '镜像大小',
            dataIndex: 'Size',
            render: size => <span>{bytesToSize(size)}</span>,
            key: 'Size',
            width: 120,
        },
        {
            title: '创建时间',
            dataIndex: 'Created',
            key: 'Created',
            width: 120,
            render: time => <span>{formatDate(time * 1000)}</span>,
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address 4',
            fixed: 'right',
            width: 180,
            render: (text, image) => {
                return (
                    <Space>
                        <Button size="small" type="link" onClick={() => this.showRunModal(image)}>运行</Button>
                        <Button size="small" type="link" onClick={() => this.showImageDetail(image)}>详情</Button>
                        <Button size="small" type="link" onClick={() => this.showMoreModal(image)}>更多</Button>
                    </Space>
                )
            }

        },
    ];

export default columns;