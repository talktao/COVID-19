/* 全国数据趋势折线图 */
import React from 'react'
import * as echarts from 'echarts';
import { addTrendProps, natalityProps, nowTrendProps, totalTrendProps } from 'types/chinaTrend';

type Props = {
    nowTrend: nowTrendProps[] ;
    addTrend: addTrendProps[] ;
    totalTrend: totalTrendProps[] ;
    natality: natalityProps[] ;
};

 const ChinaTrend: React.FC<Props> = ({nowTrend, addTrend, totalTrend, natality}) => {
    return (
        <div>
            哒哒哒哒哒哒
        </div>
    )
}
export default ChinaTrend
