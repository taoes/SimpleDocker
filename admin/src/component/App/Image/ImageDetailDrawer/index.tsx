import {Spin} from "antd";
import ReactJson from "react-json-view";
import {useEffect, useState} from "react";
import {getImageDetail} from "../../../../api/Image/ImageApi";

interface ImageDetailProps {
    imageId: string
}

export default function ImageDetailDrawer(props: ImageDetailProps) {

    let [loading, setLoading] = useState(true)
    let [detail, setDetail] = useState({})

    useEffect(() => {
        getImageDetail(props.imageId).then(data => {
            setDetail(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])


    return (
        <Spin spinning={loading}>
            <ReactJson src={detail}
                       displayDataTypes={false}
                       style={{overflow: 'auto'}} collapsed={1}/>
        </Spin>
    )
}