import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts';
import { Radio } from 'antd';
import styled from "@emotion/styled";
import { localConfirmAddProps, localConfirmProps } from 'types/addConfirmTrend';



const AddConfirmTrend = ({localConfirmAdd, localConfirm}:{localConfirmAdd:localConfirmAddProps[], localConfirm:localConfirmProps[]}) =>{

    const [isAdd, setIsAdd] = useState(true) // 是否是本土新增，否则是本土现有

    // const [optionObj, setOptionObj] = useState({})
    // const addConfirmTrend = useRef(null)

    let chartInstance:any
    
    let initChart = (trg?:any) => {
      chartInstance = echarts.init(document.getElementById('addConfirmTrend') as HTMLDivElement); // 图表实例
        let option: any = {
            title: {
                text: trg ? '本土新增确诊趋势' : '本土现有确诊趋势'
              },
              tooltip: {
                trigger: 'axis',
                textStyle:{
                  align:'left'
              }
              },
              legend: {
                data: [{
                  name: trg ? '本土新增确诊' : '本土现有确诊',
                  // 强制设置图形为圆。
                  icon: 'rect',
                  // 设置文本为黑色
                  textStyle: {
                      color: '#000'
                  }
              }]
              },
              grid: {
                left: '5%',
                right: '4%',
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
                data: localConfirmAdd.map((item:any)=>item.date.replace(/[.]/g, '-'))
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                    name: trg ? '本土新增确诊' : '本土现有确诊',
                    type: 'line',
                    data: trg ? localConfirmAdd.map((item:any)=>item.localConfirmadd) : localConfirm.map((item:any)=>item.localConfirm),
                    itemStyle: {
                        color: trg ? '#e57631' : '#f06061',   
                        borderWidth: 1 ,
                        borderType: 'solid'
                    },
                    lineStyle: {
                        color: trg ? '#e57631' : '#f06061'
                    }
                },
              ]
        };
        // setOptionObj(option)
        chartInstance.setOption(option);
    };
    
    useEffect(() => {
        initChart(isAdd);
        return ()=>{
          chartInstance.dispose() // 初次渲染时清除图表实例
        }
    });

    // 切换折线图数据
    const handleLineChange = (e:any) => {
        chartInstance.dispose() // 切换时清除上次图表实例
        setIsAdd(e.target.value)
        initChart(e.target.value)
    }

    return(
        <div>
            <RadioGroupStyle buttonStyle={'solid'} value={isAdd} onChange={handleLineChange}>
              <RadioButtonStyle value={true}>本土新增确诊趋势</RadioButtonStyle>
              <RadioButtonStyle value={false}>本土现有确诊趋势</RadioButtonStyle>
            </RadioGroupStyle>
            <div id={'addConfirmTrend'} style={{width:800,height:600}}/>
            {/* <CostomEcharts currentRef={addConfirmTrend} style={{width:800,height:600}} option={optionObj} param={isAdd} /> */}
        </div>
    )
}
export default AddConfirmTrend

export const RadioGroupStyle = styled(Radio.Group)`
  padding: 20px 0;
`
export const RadioButtonStyle = styled(Radio.Button)`
  margin-right: 20px;
  color: cadetblue;
  &:hover{
    color: #b0e0e6;
    background: #fff;
    border-color: #b0e0e6;
  }
`
