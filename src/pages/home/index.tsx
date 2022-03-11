import React, {useState, useEffect, createContext} from "react";
import CardInfo from "pages/home/cardInfo";
import LocalCases from "pages/home/localCases"
import { Col} from "antd";
import { httpGet } from "utils/http";
import AddConfirm from "./addConfirmTrend";
import ChinaTrend from "./chinaTrend";
import { Row, ScreenContainer } from 'components/lib'
import { PreDayProps, TotalProps } from "types/cardInfo";
import { localConfirmAddProps, localConfirmProps } from "types/addConfirmTrend";
import { addTrendProps, natalityProps, nowTrendProps, totalTrendProps } from "types/chinaTrend";
import { nowDataProps } from "types/chinaMap";


/* ChinaMap组件使用 */
export const NowContext = createContext({})  // 各省份（直辖市）现存确诊人数数据
export const TotalContext = createContext({}) // 各省份（直辖市）累计确诊人数数据
// export const TotalContext = createContext({}) // 各省份（直辖市）累计确诊人数数据

const Home : React.FC =  () => {
    const [chinaAdd, setChinaAdd] = useState<Partial<PreDayProps>>({})  // 较昨日新增数据
    const [chinaTotal, setChinaTotal] = useState<Partial<TotalProps>>({}) // 累计数据

    const [nowData, setNowData] = useState({}) // 各省份现存确诊
    const [totalData, setTotalData] = useState({}) // 各省份累计确诊

    const [localConfirmAdd, setLocalConfirmAdd] = useState([]) // 本土新增数据趋势
    const [localConfirm, setLocalConfirm] = useState([]) // 本土累计数据趋势

    const [nowTrend, setNowTrend] = useState([]) // 全国现有确诊趋势
    const [addTrend, setAddTrend] = useState([]) // 全国疫情新增趋势
    const [totalTrend, setTotalTrend] = useState([]) // 全国疫情累计趋势
    const [natality, setNatality] = useState([]) // 治愈率，病死率


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
        chinaAdd.confirm = data[1].confirm - data[0].confirm
        chinaAdd.nowConfirm = data[1].nowConfirm - data[0].nowConfirm
        setChinaAdd(chinaAdd)
        
        // 本土新增数据趋势数据
        const localConfirmAdd = result.data.chinaDayAddList.map((item:localConfirmAddProps)=>({localConfirmadd:item.localConfirmadd, date:item.date}))
        setLocalConfirmAdd(localConfirmAdd)

        // 本土累计数据趋势数据
        const localConfirm = result.data.chinaDayList.map((item:localConfirmProps)=>({localConfirm:item.localConfirm, date:item.date}))
        setLocalConfirm(localConfirm)   
        
        // 全国现有确诊趋势
        const nowTrend = result.data.chinaDayList.map((item: nowTrendProps)=>({nowConfirm: item.nowConfirm, date:item.date}))
        console.log(nowTrend,'nowTrend');
        setNowTrend(nowTrend)

        // 全国疫情新增趋势
        const addTrend = result.data.chinaDayAddList.map((item:addTrendProps)=>({confirm: item.confirm, suspect: item.suspect, date: item.date}))
        console.log(addTrend,'addTrend');
        setAddTrend(addTrend)
        
        // 全国疫情累计趋势
        const totalTrend = result.data.chinaDayList.map((item:totalTrendProps)=>({confirm: item.confirm, heal: item.heal, dead: item.dead, date: item.date}))
        console.log(totalTrend,'totalTrend');
        setTotalTrend(totalTrend)

        // 治愈率，病死率
        const natality = result.data.chinaDayList.map((item:natalityProps)=>({healRate: item.healRate, deadRate: item.deadRate, date: item.date}))
        console.log(natality,'natality');
        setNatality(natality)
        
    }

    // 获取疫情信息数据
    const getOnsInfo = async () => {
        const result = await fetch('https://mock.yonyoucloud.com/mock/22022/COVID-19/getOnsInfo/list')
        const data = await result.json()
        console.log(data,'datadata');
        
        const listData = data.data.areaTree[0].children.map((item:nowDataProps)=>({name:item.name, value: item.total.nowConfirm})) // 获取现有确诊人数数据
        const totalList = data.data.areaTree[0].children.map((item:nowDataProps)=>({name:item.name, value: item.total.confirm}))  // 获取累计确诊人数数据
        console.log(totalList,'totalList');
        
        setNowData(listData)
        setTotalData(totalList)
    }

    return(
        <>
            <ScreenContainer>
                <CardInfo chinaAdd={chinaAdd} chinaTotal={chinaTotal} />
            </ScreenContainer>

            <ScreenContainer marginTop={2}>
                <NowContext.Provider value={nowData}>
                    <TotalContext.Provider value={totalData} >
                        <LocalCases />
                    </TotalContext.Provider>
                </NowContext.Provider>
            </ScreenContainer>
            
            <ScreenContainer marginTop={2}>
                <Row between={true} gap={2} marginBottom={2}>
                    <Col>
                        <AddConfirm localConfirmAdd={localConfirmAdd} localConfirm={localConfirm} />
                    </Col>
                    <Col>
                        <ChinaTrend nowTrend={nowTrend} addTrend={addTrend} totalTrend={totalTrend} natality={natality} />
                    </Col>
                </Row>
            </ScreenContainer>
        </>
    );
};


export default Home


