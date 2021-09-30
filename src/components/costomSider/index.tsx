import React from 'react'
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';
import {
    FundOutlined,
    PieChartOutlined,
    StockOutlined,
} from '@ant-design/icons';

import styled from "@emotion/styled";

const CostomSider: React.FC = () => {
    
const navigate = useNavigate();

const nav = (path:any) => {
    navigate(path);
}
        return (
            <>
                <Logo className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={() => nav("/main/home")} icon={<FundOutlined />}>
                        疫情数据
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => nav("/main/page1")} icon={<PieChartOutlined />}>
                        疫情分布
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => nav("/main/welcome")}  icon={<StockOutlined />}>
                        疫情趋势
                    </Menu.Item>
                </Menu>
            </>
        )
}
export default CostomSider

const Logo = styled.div`
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
`