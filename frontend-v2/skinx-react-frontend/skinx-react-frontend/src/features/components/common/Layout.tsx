import { NavLink, Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useRecoilValue } from "recoil";
import { userNameSelector } from "../../utils/atom";
import '../../../App.css';
import { Layout } from "antd";

const { Content, Sider } = Layout;

export default function AppLayout() {
  // const user = useRecoilValue(userNameSelector);
  // console.log('user: ', user);

  <li><NavLink to="/">Home</NavLink></li>
  return (
    <Layout className="h-screen">
      <Sider width={200} className="site-layout-background">
        <SideMenu />
      </Sider>
      <Layout className="max-h-screen overflow-y-auto" style={{ padding: '0 24px 0 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}