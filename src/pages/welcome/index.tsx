import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';

const Welcome: React.FC =  () => {
    const main2 = useRef(null);
    let chartInstance = null;

    let renderChart = () => {
        const myChart = echarts.getInstanceByDom(main2.current as unknown as HTMLDivElement);
        if(myChart)
            chartInstance = myChart;
        else
            chartInstance = echarts.init(main2.current as unknown as HTMLDivElement);
        chartInstance.setOption({
            title: {
                text: '燃尽图'
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            legend: {
                data: ['Remain', 'Ideal']
            },
            xAxis: {
                boundaryGap: false,
                type: 'category',
                data: ['1-1', '1-2', '1-3', '1-5', '1-6', '1-7', '1-8', '1-9']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Remain',
                    data: [140, 110, 100, 90, 70, 30, 10, 0],
                    type: 'line'
                },
                {
                    name: 'Ideal',
                    data: [140, 120, 100, 80, 60, 40, 20, 0],
                    type: 'line'
                }
            ]
        })
    };

    let initChart = () => {
        let element = document.getElementById('main');
        let myChart = echarts.init(element as HTMLDivElement);
        let option = {
            title: {
                text: 'ECharts 入门示例',
            },
            tooltip: {
            },
            legend: {
                data:['销量', '利润', '比率']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {
            },
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                },
                {
                    name: '利润',
                    type: 'bar',
                    data: [30, 25, 15, 20, 20, 35]
                },
                {
                    name: '比率',
                    type: 'line',
                    data: [35, 30, 20, 25, 25, 40]
                }]
        };
        myChart.setOption(option);
    };
    
    useEffect(() => {
        initChart();
        renderChart();
    });

    return(
        <div>
            <div id={'main'} style={{height: 400}}/>
            <div style={{height: 400}} ref={main2}/>
        </div>
    );
};

export default Welcome
