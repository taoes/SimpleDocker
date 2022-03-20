import React from "react";
import {Layout} from "antd";
import LoginPage from "../page/login";

export default function LoginLayout() {
    return (
        <Layout style={{minHeight: '100%'}}>
            <LoginPage/>
        </Layout>

    );
}
