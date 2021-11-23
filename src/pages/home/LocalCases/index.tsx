import React,{ useState, useEffect } from 'react'
import { Row, ScreenContainer } from 'components/lib'
import { Table, Tag, Button, Col } from 'antd';
import styled from '@emotion/styled';
import ChinaMap from 'pages/home/ChinaMap';
import { httpGet } from 'utils/http';

export interface DataProps {
    city: string,
    province: string,
    confirmAdd: number,
    nowConfirm: number,
    confirm: number,
    heal: number,
    dead: number,
    grade: string,
    syear: number,
    sdate: string,
    date: string,
}

const LocalCases: React.FC = () => {

    const [dataSource, setDataSource] = useState<DataProps[]>([])

    useEffect(() => {
        getGradeCityDetailList()
    }, [])

    // 获取近期31省市区数据
    const getGradeCityDetailList = async() => {
        let url = "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail";
        const result = await httpGet(url)
        const data = result.data.statisGradeCityDetail.map((item: object, index:number) => ({ ...item, key: index }))
        setDataSource(data)
        console.log(result,'result') 
    } 

    const handleDetail = async (rowData:any) => {
        const { province, city } = rowData
        let url = `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=${province}&city=${city}`
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
        })
        const result = await response.json()
        console.log(result,'result');  
    }

    const columns = [
        {
            title: '城市(区)',
            dataIndex: 'city',
        },
        {
            title: '省市区',
            dataIndex: 'province',
        },
        {
            title: '新增',
            dataIndex: 'confirmAdd',
            render: (text:number) => <>{text === 0 ? <TagStyle color="default" >{text}</TagStyle> : <TagStyle color="red">+{text}</TagStyle>}</>
        },
        {
            title: '现有确诊',
            dataIndex: 'nowConfirm',
        },
        {
            title: '累计确诊',
            dataIndex: 'confirm',
        },
        {
            title: '治愈',
            dataIndex: 'heal',
        },
        {
            title: '死亡',
            dataIndex: 'dead',
        },
        {
            title: '区域风险',
            dataIndex: 'grade',
        },
        {
            title:'详情',
            dataIndex: "operation",
            render: (text:any, rowData:object)=><><Button onClick={()=>handleDetail(rowData)}>详情</Button></>
        }
    ]

    return (
        <ScreenContainer marginTop={2}>
            <Row between={true} gap={2} marginBottom={2}>
                <Col>
                    近期31省市区本土病例
                     <a style={{marginLeft:'20px'}} href='https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail'>
                        数据来源:https://api.inews.qq.com/
                    </a>
                </Col>

                <Col>
                    <a href='https://mock.yonyoucloud.com/mock/22022/COVID-19/getOnsInfo/list'>
                        数据来源:https://mock.yonyoucloud.com/mock/22022/COVID-19/getOnsInfo/list
                    </a>
                </Col>
            </Row>
            <Row between={true} gap={2}>
                <Col>
                    <Table 
                            columns={columns} 
                            dataSource={dataSource.sort((a,b) => b.confirmAdd - a.confirmAdd)} 
                        />
                </Col>
                <Col>
                    <ChinaMap/>
                </Col>
           </Row>
        </ScreenContainer>
    )
}
export default LocalCases

const TagStyle = styled(Tag)`
    border: none;
    background-color: none;
    background: none;
    font-size: 16px;
`
