import {Component} from "react";
import {Table} from "antd";

/**
 * 主页布局文件
 */
class ImagePage extends Component {

    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
                width: 150,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 80,
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address 1',
                ellipsis: true,
            },
            {
                title: '父级',
                dataIndex: 'address',
                key: 'address 2',
                ellipsis: true,
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address 3',
                ellipsis: true,
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: 'address 4',
                ellipsis: true,
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ];

        return (
            <div>
                <Table columns={columns} dataSource={data} size="small"/>
            </div>
        )
    }

}

export default ImagePage;