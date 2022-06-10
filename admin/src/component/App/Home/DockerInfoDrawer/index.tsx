import DockerInfo from "../../../../api/Model/DockerInfo";
import {Spin} from "antd";
import ReactJson from "react-json-view";


export default function DockerInfoDrawer(props: any){


    return (
        <Spin spinning={false}>
            <ReactJson src={props.dockerInfo}
                       displayDataTypes={false}
                       style={{overflow: 'auto'}}
                       collapsed={2}/>
        </Spin>
    )
}