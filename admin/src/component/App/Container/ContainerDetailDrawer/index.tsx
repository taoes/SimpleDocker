import {useEffect, useState} from "react";
import {getContainerDetail} from "../../../../api/Container/ContainerApi";
import {Spin} from "antd";
import ReactJson from "react-json-view";

interface ContainerDetailProps {
    containerId: string
}

function ContainerDetailDrawer(props: ContainerDetailProps) {
    let {containerId} = props;


    let [loading, setLoading] = useState(true)
    let [detail, setDetail] = useState({})

    useEffect(() => {
        getContainerDetail(containerId).then(data => {
                setLoading(false)
                setDetail(data)
            }).catch(() => setLoading(false)
        )

    }, [])

    return (
        <Spin spinning={loading}>
            <ReactJson src={detail}
                       displayDataTypes={false}
                       style={{overflow: 'auto'}} collapsed={1}/>
        </Spin>
    )
}

export default ContainerDetailDrawer;