/* 近期31省市区本土病例 类型 */

export interface DataProps {
    city: string,
    province: string,
    confirmAdd: number,
    nowConfirm: number,
    confirm: number,
    heal: number,
    dead: number,
    grade: string,
    syear: number,
    sdate: string,
    date: string,
}