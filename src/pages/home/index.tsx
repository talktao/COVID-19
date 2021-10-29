import React, {useState, useEffect} from "react";
import CardInfo from "pages/home/CardInfo";
import LocalCases from "pages/home/LocalCases"
import { Col, Row } from "antd";

export interface PreDayProps {
    confirm:string;
    dead:  string;
    importedCase: string;
    localConfirmadd: string;
    infect: string;
    nowConfirm:string;
}

export interface TotalProps {
    confirm: number;
    dead: number;
    importedCase: number;
    localConfirm: number;
    noInfect: number;
    nowConfirm: number
}

const Home : React.FC =  () => {

    const [chinaAdd, setChinaAdd] = useState<Partial<PreDayProps>>({})  // 较昨日新增数据
    const [chinaTotal, setChinaTotal] = useState<Partial<TotalProps>>({}) // 累计数据

    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {
            let url = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
              });
              const result = await response.json(); // 获取接口中的json数据   
              const chinaAdd = (result.data.chinaDayAddList[result.data.chinaDayAddList.length- 1]) // 获取 chinaDayAddList 中最后一条数据
              setChinaTotal(result.data.chinaDayList[result.data.chinaDayAddList.length- 1])  // 获取 chinaDayList 中最后一条数据
              const data = result.data.chinaDayList.map((item:any)=>{
                  return {
                    confirm:item.confirm,
                    nowConfirm: item.nowConfirm
                  }
              }).slice(-2) 
              console.log(data,'data');
              chinaAdd.confirm = data[1].confirm - data[0].confirm
              chinaAdd.nowConfirm = data[1].nowConfirm - data[0].nowConfirm
              setChinaAdd(chinaAdd) 
              console.log(chinaAdd,'chinaAdd');                         
    }

    
    return(
        <Row>
            <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                <CardInfo chinaAdd={chinaAdd} chinaTotal={chinaTotal} />
                <LocalCases />
            </Col>
        </Row>
    );
};


export default Home


