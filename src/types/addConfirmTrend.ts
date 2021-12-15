/* 本土新增/确诊趋势折线图 类型 */

import { dateProps } from "types";


// 本土新增数据趋势接口
export interface localConfirmAddProps extends dateProps {
    localConfirmadd: number;
}

// 本土累计数据趋势
export interface localConfirmProps extends dateProps {
    localConfirm: number;
}