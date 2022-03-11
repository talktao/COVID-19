/* 全国数据趋势折线图 */
import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts';
import { addTrendProps, natalityProps, nowTrendProps, totalTrendProps } from 'types/chinaTrend';
import { RadioButtonStyle, RadioGroupStyle } from '../addConfirmTrend';
import { confirmConfig, deadConfig, healConfig, legendData, nowConfirmConfig, suspectConfig, totalConfirmConfig } from 'components/lib';

type Props = {
    nowTrend: nowTrendProps[] ;
    addTrend: addTrendProps[] ;
    totalTrend: totalTrendProps[] ;
    natality: natalityProps[] ;
};

 const ChinaTrend: React.FC<Props> = ({nowTrend, addTrend, totalTrend, natality}) => {

    const [trendType, setTrendType] = useState(0) // 疫情趋势类型 0：全国现有确诊趋势，1：全国疫情新增趋势，2：全国疫情累计趋势，3：治愈率，病死率

    let chartInstance:any
    
    let initChart = (trg?:any) => {
      chartInstance = echarts.init(document.getElementById('chinaTrend') as HTMLDivElement); // 图表实例
        let option: any = {
            title: {
                text: trg === 0 ? '全国现有确诊趋势' : '全国疫情新增趋势'
            },
            tooltip: {
                trigger: 'axis',
                formatter: trg === 3 ?'{b0}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />' : '',
                textStyle:{
                    align:'left'
                }
            },
            legend: {
                data: trg === 0 ? [{ name: '现有确诊', ...legendData}] :
                      trg === 1 ? [{ name: '新增确诊', ...legendData}, { name: '新增疑似', ...legendData}] : 
                      trg === 2 ? [{ name: '累计确诊', ...legendData}, { name: '累计治愈', ...legendData}, { name: '累计死亡', ...legendData}] : 
                      trg === 3 ? [{ name: '治愈率', ...legendData}, { name: '病死率', ...legendData}] : []
            },
            grid: {
                left: '7%',
                right: '3%',
                bottom: '3%',
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: nowTrend.map((item:any)=>item.date.replace(/[.]/g, '-'))
            },
            yAxis: {
                type: 'value'
            },
            series: trg === 0 ? [
                    {
                        name: '现有确诊',
                        type: 'line',
                        data: nowTrend.map((item:any)=>item.nowConfirm),
                        ...nowConfirmConfig
                    },
                ] : trg === 1 ? [
                    {
                        name: '新增确诊',
                        type: 'line',
                        data: addTrend.map((item:any)=>item.confirm),
                        ...confirmConfig
                    },
                    {
                        name: '新增疑似',
                        type: 'line',
                        data: addTrend.map((item:any)=>item.suspect),
                        ...suspectConfig
                    },                    
                ] : trg === 2 ? [
                    {
                        name: '累计确诊',
                        type: 'line',
                        data: totalTrend.map((item:any)=>item.confirm),
                        ...totalConfirmConfig
                    },
                    {
                        name: '累计治愈',
                        type: 'line',
                        data: totalTrend.map((item:any)=>item.heal),
                        ...healConfig
                    },
                    {
                        name: '累计死亡',
                        type: 'line',
                        data: totalTrend.map((item:any)=>item.dead),
                        ...deadConfig
                    },
                ] : trg === 3 ? [
                    {
                        name: '治愈率',
                        type: 'line',
                        data: natality.map((item:any)=>item.healRate),
                        ...healConfig
                    },
                    {
                        name: '病死率',
                        type: 'line',
                        data: natality.map((item:any)=>item.deadRate),
                        ...deadConfig
                    },
                ] : []
        };
        chartInstance.setOption(option);
    };
    
    useEffect(() => {
        initChart(trendType);
        return ()=>{
          chartInstance.dispose() // 初次渲染时清除图表实例
        }
    });

    // 切换折线图数据
    const handleLineChange = (e:any) => {
        chartInstance.dispose() // 切换时清除上次图表实例
        setTrendType(e.target.value) 
        initChart(e.target.value)
    }

    return(
        <div>
            <RadioGroupStyle buttonStyle={'solid'} value={trendType} onChange={handleLineChange}>
                <RadioButtonStyle value={0}>全国现有确诊趋势</RadioButtonStyle>
                <RadioButtonStyle value={1}>全国疫情新增趋势</RadioButtonStyle>
                <RadioButtonStyle value={2}>全国疫情累计趋势</RadioButtonStyle>
                <RadioButtonStyle value={3}>治愈率、病死率</RadioButtonStyle>
            </RadioGroupStyle>
            <div id={'chinaTrend'} style={{width:780,height:600}}/>
        </div>
    )
}
export default ChinaTrend
