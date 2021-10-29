import React,{ useState, useEffect } from 'react'
import { Row, ScreenContainer } from 'components/lib'
import { Table, Tag, Button, Col } from 'antd';
import styled from '@emotion/styled';

const LocalCases: React.FC = () => {

    interface DataProps {
        city: string,
        province: string,
        confirmAdd: number,
        nowConfirm: number,
        confirm: number,
        heal: number,
        dead: number,
        grade: string,
    }

    const [dataSource, setDataSource] = useState<DataProps[]>([])

    useEffect(() => {
        getGradeCityDetailList()
    }, [])

    // 获取近期31省市区数据
    const getGradeCityDetailList = async() => {
        let url = "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail";
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
        const result = await response.json()
        const data = result.data.statisGradeCityDetail.map((item: object, index:number) => ({ ...item, key: index }))
        setDataSource(data)
        console.log(result,'result')   
    } 

    const handleDetail = (rowData:object) => {
        console.log(rowData,'rowData');
        
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
           <Row between={true} gap={40} marginBottom={2}>
               <Col span={3}>近期31省市区本土病例</Col>
               <Col span={3}>xxx疫情</Col>
           </Row>
           <Row between={true} gap={2}>
                <Table 
                    columns={columns} 
                    dataSource={dataSource.sort((a,b) => b.confirmAdd - a.confirmAdd)} 
                />
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
