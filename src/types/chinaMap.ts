/* 中国疫情地图数据 类型 */


//现有确诊及累计确诊数据接口
export interface nowDataProps {
    name: string;
    total: {
        nowConfirm: number;
        confirm: number
    }
}