/* 中国地图数据切换 */
import React,{ useState, useEffect, useRef, useContext } from 'react'
import * as echarts from 'echarts';
import { NowContext, TotalContext } from 'pages/home';
import { nowDataProps } from 'types/chinaMap';
import { RadioButtonStyle, RadioGroupStyle } from '../addConfirmTrend';

const ChinaMap: React.FC = () => {

    const [isNow, setIsNow] = useState(true) // 判断是否是现存确诊

    echarts.registerMap("china", require("assets/json/china.json"));

    const confirmRef = useRef({}) // 累计确诊数据
    const chinaMapRef = useRef(null)

    let chartInstance = null;

    const nowData = useContext(NowContext)
    const totalData = useContext(TotalContext) 
      
    useEffect(() => {
      	getCityList()  
    },[])

     // 获取各省数据
    const getCityList = async () => {
		const result = await fetch('https://mock.yonyoucloud.com/mock/22022/COVID-19/getOnsInfo/list')
		const data = await result.json()
		console.log(data.data,'datadata');
		
		const listData =  data.data.areaTree[0].children.map((item:nowDataProps)=>({name:item.name, value: item.total.nowConfirm})) // 获取现有确诊人数数据
		confirmRef.current = listData
		initChart(isNow)     
    } 

    const initChart = (target?:boolean) => {

		const myChart = echarts.getInstanceByDom(chinaMapRef.current as unknown as HTMLDivElement);
		chartInstance = myChart ? myChart : echarts.init(chinaMapRef.current as unknown as HTMLDivElement) //图表实例
		let option:any = {
			title: {
				text: "全国疫情地图",
				left: "center",
				textStyle: {
					color: "#9c0505"
				}
			},
			tooltip: { // 提示框c
			trigger: "item",
			textStyle:{
				align:'left'
			},
			formatter: (p:any) => {       
				return p.data ? '省份：' + [p.data.name] + `${target ? '<br/>现存确诊：' :  '<br/>累计确诊：'}` + [p.data.value] 
									:  [p.name]
			}
			},
			series: [
			{
				type: 'map',
				map: "china",
				data: confirmRef.current,
				label: {
					show: true,
					color: "black",
					fontStyle: 10,
					align: "left",
				},
				zoom: 1.2, // 当前缩放比例
				roam: true, // 是否支持拖拽
				itemStyle: {
					borderColor: '#ccc', // 区域边框线
					borderWidth: 1
				},
				emphasis: { // 高亮显示
					label: {
						color: "black",
						fontSize: 10
					},
					itemStyle: {
						areaColor: "lightyellow" // 区域高亮颜色
					}
				}
			},
			],
			visualMap: {
				type: "piecewise",
				show: true,
				pieces: [
					{ min: 10000 },
					{ min: 1000, max: 9999 },
					{ min: 500, max: 999 },
					{ min: 100, max: 499 },
					{ min: 10, max: 99 },
					{ min: 1, max: 9 },
					{ value: 0 }
				],
				inRange: {
					color: ["#e2ebf4", "#ffe7b2", "#ffcea0", "#ffa577", "#ff6341", "#ff2736", "#de1f05"]
				}
			}
		}
		chartInstance.setOption(option);
    }

    // 切换地图（现存确诊，累计确诊）
    const handleMapChange = (e:any) => {
        setIsNow(e.target.value)
        confirmRef.current = e.target.value ? nowData : totalData 
        initChart(e.target.value)
    }

    return (
      <div>
        <RadioGroupStyle value={isNow} onChange={handleMapChange}>
            <RadioButtonStyle value={true}>现存确诊</RadioButtonStyle>
            <RadioButtonStyle value={false}>累计确诊</RadioButtonStyle>
        </RadioGroupStyle>
        <div style={{width:800,height:800}} ref={chinaMapRef} />
      </div>
    )    
}
export default ChinaMap

