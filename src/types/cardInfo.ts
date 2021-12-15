/* 卡片部分疫情信息展示 类型 */

// 较昨日新增数据接口
export interface PreDayProps {
    confirm:string;
    dead:  string;
    importedCase: string;
    localConfirmadd: string;
    infect: string;
    nowConfirm:string
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