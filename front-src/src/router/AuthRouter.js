import {Navigate} from "react-router-dom";
import React from "react";
import {notification} from "antd";


class AuthRouter extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        let token = localStorage.getItem('TOKEN')
        if (!!token) {
            return this.props.children;
        } else {
            notification['warning']({
                message: '登录已失效',
                description: '当前登录失效,请重新登陆再次尝试!'
            });
            return <Navigate to="/login"/>
        }
    }

}

export default AuthRouter;
