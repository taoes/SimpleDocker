import {Tabs} from "antd";
import React from "react";
import IconFont from "../../component/Base/IconFont";

const {TabPane} = Tabs;


function MonitorPage() {

    function createTab(icon: string, text: string): React.ReactNode {
        return <span><IconFont type={icon}/>{text}</span>
    }

    return (
        <div id="MonitorPage"  className="m-2">
            <Tabs defaultActiveKey="1">
                <TabPane tab={createTab('icon-icon-test40', '全局监控记录')} key="1" closeIcon>
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab={createTab('icon-icon-test34', '镜像监控配置')} key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab={createTab('icon-icon-test21', '容器监控记录')} key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MonitorPage;