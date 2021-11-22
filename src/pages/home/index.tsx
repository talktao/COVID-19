import React, {useState, useEffect, createContext} from "react";
import CardInfo from "pages/home/CardInfo";
import LocalCases from "pages/home/LocalCases"
import { Col, Row } from "antd";
import { httpGet } from "utils/http";

// 较昨日新增数据接口
export interface PreDayProps {
    confirm:string;
    dead:  string;
    importedCase: string;
    localConfirmadd: string;
    infect: string;
    nowConfirm:string;
}

// 累计数据接口
export interface TotalProps {
    confirm: number;
    dead: number;
    importedCase: number;
    localConfirm: number;
    noInfect: number;
    nowConfirm: number
}

//现有确诊及累计确诊数据接口
export interface nowDataProps {
    name: string;
    total: {
        nowConfirm: number
        confirm: number
    }
}

export const NowContext = createContext({})
export const TotalContext = createContext({})

const Home : React.FC =  () => {
    const [chinaAdd, setChinaAdd] = useState<Partial<PreDayProps>>({})  // 较昨日新增数据
    const [chinaTotal, setChinaTotal] = useState<Partial<TotalProps>>({}) // 累计数据
    const [nowData, setNowData] = useState({}) // 各省份现存确诊
    const [totalData, setTotalData] = useState({}) // 各省份累计确诊
    

    useEffect(() => {
        getList()
        getOnsInfo()
    }, [])

    const getList = async () => {
            let url = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare';
              const result = await httpGet(url) // 获取接口中的json数据   
              const chinaAdd = (result.data.chinaDayAddList[result.data.chinaDayAddList.length- 1]) // 获取 chinaDayAddList 中最后一条数据
              setChinaTotal(result.data.chinaDayList[result.data.chinaDayAddList.length- 1])  // 获取 chinaDayList 中最后一条数据
              const data = result.data.chinaDayList.map((item:any)=>({confirm:item.confirm,nowConfirm: item.nowConfirm})).slice(-2) // map遍历数组，只包含 confirm 和 nowConfirm 两个属性

              console.log(data,'data');
              chinaAdd.confirm = data[1].confirm - data[0].confirm
              chinaAdd.nowConfirm = data[1].nowConfirm - data[0].nowConfirm
              setChinaAdd(chinaAdd) 
              console.log(chinaAdd,'chinaAdd');                         
    }
    // 获取疫情信息数据
    const getOnsInfo = async () => {
        const result = await fetch('https://mock.yonyoucloud.com/mock/22022/COVID-19/getOnsInfo/list')
        const data = await result.json()
        const listData = data.data.areaTree[0].children.map((item:nowDataProps)=>({name:item.name, value: item.total.nowConfirm})) // 获取现有确诊人数数据
        const totallist = data.data.areaTree[0].children.map((item:nowDataProps)=>({name:item.name, value: item.total.confirm}))
        setNowData(listData)
        setTotalData(totallist)
        console.log(listData,'listData');
    }

    
    return(
        <Row>
            <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                <CardInfo chinaAdd={chinaAdd} chinaTotal={chinaTotal} />
                <NowContext.Provider value={nowData}>
                    <TotalContext.Provider value={totalData} >
                        <LocalCases />
                    </TotalContext.Provider>
                </NowContext.Provider>
            </Col>
        </Row>
    );
};


export default Home


