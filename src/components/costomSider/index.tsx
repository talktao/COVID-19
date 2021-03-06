import React from 'react'
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';
import {
    FundOutlined,
    PieChartOutlined,
    StockOutlined,
} from '@ant-design/icons';

import styled from "@emotion/styled";

type Props = {
    collapsed: boolean
}

const CostomSider: React.FC<Props> = ({collapsed}) => {
    
const navigate = useNavigate();

const nav = (path:string) => {
    navigate(path);
}
        return (
            <>
                {
                    collapsed ? <Logo className="logo">C-19</Logo> : <Logo className="logo">COVID-19</Logo>
                }
                <MenuStyle mode="inline" defaultSelectedKeys={['1']}>
                    <MenuItemStyle key="1" onClick={() => nav("/main/home")} icon={<FundOutlined />}>
                        全国疫情数据
                    </MenuItemStyle>
                    <MenuItemStyle key="2" onClick={() => nav("/main/province")} icon={<PieChartOutlined />}>
                        省份疫情数据
                    </MenuItemStyle>
                </MenuStyle>
            </>
        )
}
export default CostomSider

const Logo = styled.div`
    height: 32px;
    margin: 16px;
    color: #98c0c5;
    font-size: 22px;
    background: rgba(255, 255, 255, 0.3);
`
const MenuStyle = styled(Menu)`
    background-color: powderblue;
   
`
const MenuItemStyle = styled(Menu.Item)`
    color: #fff;
    span {
        color: cadetblue;
    }
`