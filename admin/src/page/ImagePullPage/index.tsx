import {Button, Input, message, PageHeader, Space, Table} from "antd";
import React from "react";
import {RouterProps} from "react-router";
import WithRouter from "../../router/WithRouter";
import {searchImage} from '../../api/Image/ImageApi'
import {ColumnsType} from "antd/es/table";
import ImageSearchItem from "../../api/Model/Image/ImageSearchItem";
import {CloudDownloadOutlined, SearchOutlined} from '@ant-design/icons'

interface ImagePullPageProps {
    router: RouterProps
}

interface ImagePullPageState {
    searchKey: string,
    imageVersion: string,
    searchItem: Array<ImageSearchItem>
}


class ImagePullPage extends React.Component<ImagePullPageProps, ImagePullPageState> {
    private renameData: { newTag: string; imageId: string };

    /**
     * 镜像表格的数据
     * @private
     */
    private readonly columns: ColumnsType<ImageSearchItem>;

    constructor(props: ImagePullPageProps) {
        super(props);
        this.renameData = {imageId: '', newTag: ''}
        this.state = {
            imageVersion: '',
            searchKey: 'nginx',
            searchItem: []
        }

        this.columns = [
            {
                title: '镜像名称',
                dataIndex: 'name',
                render: name => <span>{name}</span>,
                fixed: 'left',
                width: '200',
            },
            {
                title: '镜像描述',
                dataIndex: 'description',
                render: description => <span>{description}</span>,
            },
            {
                title: 'Stat数量',
                dataIndex: 'star_count',
                fixed: 'right',
                width: 80,
                render: star_count => <span>{star_count}</span>,
            },
            {
                title: '操作',
                dataIndex: 'address',
                fixed: 'right',
                width: 80,
                render: (_, item: ImageSearchItem) => {
                    return (
                        <Space>
                            <Button size={"small"} onClick={() => window.alert("开发中,敬请期待")} icon={<CloudDownloadOutlined />}>拉取</Button>
                        </Space>
                    )
                }

            }
        ]
    }

    backImagePage = () => {
        // @ts-ignore
        this.props.router.navigate(-1)
    }


    searchImageFromHub = () => {
        let key = new Date().getTime();
        const hide = message.loading({content: "正在搜索镜像中，请稍后....", key, duration: 15});
        searchImage(this.state.searchKey).then(resp => {
            let {code} = resp
            if (code === 0) {
                hide();
                this.setState({searchItem: resp.data})
                return
            }

            message.error({
                content: `抱歉,搜索镜像失败,异常信息:${resp.msg}`,
                key,
                duration: 10
            }).then();
        })
    }

    render() {
        return (
            <div id="imagePullPage" className={"box"}>
                <PageHeader
                    className="site-page-header"
                    title="拉取新的容器"
                    onBack={this.backImagePage}
                    extra={
                        <></>
                    }>
                    <Space>
                        <Input
                            placeholder="请输入镜像关键词" style={{width: 500}}
                            onChange={(e) => {
                                this.setState({searchKey: e.target.value})
                            }}/>

                        <Input
                            placeholder="请输入版本(默认为 latest)" style={{width: 500}}
                            defaultValue={this.state.imageVersion}
                            onChange={(e) => {
                                this.setState({imageVersion: e.target.value})
                            }}/>

                        <Button onClick={this.searchImageFromHub} icon={<SearchOutlined />}>搜索</Button>

                    </Space>
                </PageHeader>


                <Table size={"small"}
                       columns={this.columns}
                       dataSource={this.state.searchItem}
                       rowKey={record => record.name}/>
            </div>
        )
    }
}

export default WithRouter(ImagePullPage);