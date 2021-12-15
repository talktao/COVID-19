/* 全国现有/新增/累计/生死率 类型 */

import { dateProps } from "types";

// 全国现有确诊趋势
export interface nowTrendProps extends dateProps {
    nowConfirm: number;
}

// 全国疫情新增趋势
export interface addTrendProps extends dateProps {
    confirm: number;
    suspect: number;
}

// 全国疫情累计趋势
export interface totalTrendProps extends dateProps {
    confirm: number;
    heal: number;
    dead: number;
}

// 治愈率，病死率
export interface natalityProps extends dateProps {
    healRate: string;
    deadRate: string;
}