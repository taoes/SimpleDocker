import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import MainTopNav from "../../component/Main/MainTopNav";
import MainSideMenu from "../../component/Main/MainSideMenu";
import MainFooter from "../../component/Main/MainFooter";

const {Header, Sider, Content, Footer} = Layout;

export default function MainLayout() {
    return (
        <Layout>
            <Header>
                <MainTopNav/>
            </Header>
            <Layout>
                <Sider>
                    <MainSideMenu/>
                </Sider>
                <Content className="m-3 has-background-white">
                    <Outlet/>
                </Content>
            </Layout>
            <Footer>
                <MainFooter/>
            </Footer>
        </Layout>
    )
}