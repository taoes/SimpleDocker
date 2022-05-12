import {Tabs} from "antd";
import React from "react";
import IconFont from "../../component/Base/IconFont";
import TerminalConfigTab from "./TerminalTab";
import DockerServerTab from "./DockerServerTab";

const {TabPane} = Tabs;

function SettingPage() {

    function createTab(icon: string, text: string): React.ReactNode {
        return <span><IconFont type={icon}/>{text}</span>
    }

    return (
        <div id="SettingPage">
            <Tabs defaultActiveKey="1">
                <TabPane tab={createTab('icon-icon-test40', '数据源')} key="1" closeIcon>
                    <DockerServerTab/>
                </TabPane>
                <TabPane tab={createTab('icon-icon-test56', '终端')} key="2">
                    <TerminalConfigTab/>
                </TabPane>
                <TabPane tab={createTab('icon-icon-test5', '自动化')} key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default SettingPage;