import React,{ useState, useRef} from "react";
import { useLocation, Outlet, Route } from "react-router-dom";
import CostomSider from "components/costomSider";
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styled from "@emotion/styled";
import Home from "pages/home";

const { Header, Sider, Content, Footer } = Layout;

const Main: React.FC = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const siderRef = useRef(null)

    const location = useLocation()

    const toggle  = () => {
        setCollapsed(!collapsed)
    }
     
    return (
        <>
            <Layout>
                <SiderStyle ref={siderRef} trigger={null} collapsible collapsed={collapsed}>
                    <CostomSider collapsed={collapsed} />
                </SiderStyle>
                <Layout style={{backgroundColor:'#fff'}}>
                    <HeaderStyle onClick={toggle} >
                        {
                            collapsed ? <SpanStyle><MenuUnfoldOutlined /></SpanStyle> : <SpanStyle><MenuFoldOutlined /></SpanStyle>
                        }
                        <span style={{paddingLeft:'40%'}}>疫情数据展示</span>
                    </HeaderStyle>
                    <Content style={{padding: 24,minHeight: 280,}}>
                        {
                            location.pathname === '/' ? <Route path='/main/home' element={<Home/>} /> : <Outlet />    
                        }  
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>COVID-19 ©talktao</Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default Main;

const SpanStyle = styled.span`
    font-size: 32px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
`
const HeaderStyle = styled(Header)`
    padding-left: 10px;
    background-color: #fff;
    text-align: left;
`
const SiderStyle = styled(Sider)`
    background: #b0e0e6;
`