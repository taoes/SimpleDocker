import React, {Component, useEffect, useState} from "react";

import './index.css'
import {Button, Descriptions, Drawer, Space, Tag} from "antd";
import {getDockerInfo} from '../../api/InfoApi'
import ReactJson from "react-json-view";
import AppDescriptions from "../../components/Home/AppDescriptions";
import VersionDescription from "../../components/Home/VersionDescription";
import IconFont from "../../components/IconFont";


let _ = require('lodash')

const dockerInfoDefault = {
    info: {},
    version: {},
    disk: {},
    modalVisible: false
}

/**
 * 主页布局文件
 */
function HomePage() {

    let [dockerInfo, setDockerInfo] = useState(dockerInfoDefault)
    let [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getDockerInfo().then(data => {
            setDockerInfo(data)
        })
    }, [])


    function modifyModalVisible() {
        setModalVisible(!modalVisible)
    }

    let controllerBtn = <Button icon={<IconFont type="icon-settings"/>} onClick={() => modifyModalVisible()}>详情信息</Button>


    return (
        <div>
            <VersionDescription dockerInfo={dockerInfo} extra={controllerBtn}/>
            <AppDescriptions dockerInfo={dockerInfo}/>

            <Drawer
                title="详情信息"
                width="500"
                visible={modalVisible}
                onClose={() => modifyModalVisible()}>
                <ReactJson src={dockerInfo}
                           displayDataTypes={false}
                           style={{overflow: 'auto'}}
                           collapsed={1}/>
            </Drawer>
        </div>

    )
}

export default HomePage;
