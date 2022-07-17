import React from "react";
import {Tabs} from "antd";
import UserList from "../../component/Auth/UserList";
import RoleList from "../../component/Auth/RoleList";
import PermissionList from "../../component/Auth/PermissionList";
import IconFont from "../../component/Base/IconFont";

interface Props {

}

interface State {

}


const {TabPane} = Tabs;
export default class AuthPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    createTab = (icon: string, text: string): React.ReactNode => {
        return <span><IconFont type={icon}/>{text}</span>
    }

    render() {
        return (
            <div className={"m-2"}>
                <Tabs>
                    <TabPane tab={this.createTab('icon-icon-test40',"用户列表")} key={"user"}>
                        <UserList/>
                    </TabPane>
                    <TabPane tab={this.createTab('icon-icon-test56',"角色列表")} key={"role"}>
                        <RoleList/>
                    </TabPane>
                    <TabPane tab={this.createTab('icon-icon-test5',"权限列表")} key={"permission"}>
                        <PermissionList/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
