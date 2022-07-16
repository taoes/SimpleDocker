import React from "react";
import {Tabs} from "antd";
import UserList from "../../component/Auth/UserList";
import RoleList from "../../component/Auth/RoleList";
import PermissionList from "../../component/Auth/PermissionList";

interface Props {

}

interface State {

}



const {TabPane} = Tabs;
export default class AuthPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className={"m-2"}>
                <Tabs>
                    <TabPane tab={"用户管理"} key={"user"}>
                        <UserList/>
                    </TabPane>
                    <TabPane tab={"角色管理"} key={"role"}>
                        <RoleList/>
                    </TabPane>
                    <TabPane tab={"权限列表"} key={"permission"}>
                        <PermissionList/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
