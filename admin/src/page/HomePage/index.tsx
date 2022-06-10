import React, {useEffect, useState} from "react";
import {GetDockerInfo} from '../../api/Info/Info'
import DockerVersionDescription from "../../component/App/Home/DockerVersionDescription";
import DockerServerInfo from "../../api/Model/DockerInfo";
import DockerInfoDescription from "../../component/App/Home/DockerInfoDescription";
import {Button} from "antd";
import IconFont from "../../component/Base/IconFont";


function HomePage() {

    let [dockerServiceInfo, setDockerServiceInfo] = useState<DockerServerInfo>()

    useEffect(() => {
        GetDockerInfo().then(data => {
            setDockerServiceInfo(data)
        })
    }, [])


    return (
        <div id="homePage">
            <DockerVersionDescription dockerInfo={dockerServiceInfo}/>
            <DockerInfoDescription dockerInfo={dockerServiceInfo}/>
        </div>
    )
}

export default HomePage;