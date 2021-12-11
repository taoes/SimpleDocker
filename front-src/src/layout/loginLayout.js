import React from "react";
import {Layout} from "antd";
import LoginPage from "../page/login";

class LoginLayout extends React.Component {

    render() {
        return (
            <Layout style={{minHeight: '100%'}}>
                <LoginPage/>
            </Layout>

        );
    }
}

export default LoginLayout;
