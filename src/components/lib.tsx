import React from 'react';
import styled from "@emotion/styled";
import { Button, Spin, Typography } from 'antd';
// import { Typography } from "antd";

type RowProps = {
	gap?: number | boolean,
	between?: boolean,
	marginBottom?: number,
	marginTop?: number,
}

export const Row = styled.div<RowProps>`
	display: flex;
	align-items: center;
	justify-content: ${props => props.between ? 'space-between' : undefined};
	margin-bottom: ${props => props.marginBottom + 'rem'};
	> * {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
	}
`
// 页面padding
export const ScreenContainer = styled.div<RowProps>`
	padding: 0 3.2rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: ${props => props.marginTop + 'rem'};
	> * {
		margin-top: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
		margin-bottom: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
	}
`

// 页面初次加载时的loading
export const FullPageLoading = () => <FullPage><Spin tip="Loading..." size={'large'}></Spin></FullPage>

// 页面发生错误时返回的错误信息
export const FullPageError = ({ error }: { error: Error | null }) => <FullPage>
	<ErrorBox error={error} />
</FullPage>

const FullPage = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

// 类型守卫, 解决error类型为unknown的场景
const isError = (value: any): value is Error => value?.message

// 自定义Error组件，给定任意类型，只有是在真正报错误信息的情况下才显示error.message
export const ErrorBox = ({ error }: { error: unknown }) => {
	if (isError(error)) {
		return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
	}
	return null
}

// padding为0的按钮
export const ButtonNoPadding = styled(Button)`
	padding: 0;
`
/* echarts 公共配置 */
export const legendData = {icon: 'rect', textStyle: { color: '#000' }} // 抽出折线图公共分类类型样式

export const healConfig = {itemStyle: {color:'#65b379', borderWidth: 1 ,borderType: 'solid'},lineStyle: {color:'#65b379'}} // 抽出折线图治愈类型样式

export const deadConfig = {itemStyle: {color:'#87878b',   borderWidth: 1 ,borderType: 'solid'},lineStyle: {color:'#87878b'}} // 抽出折线图死亡类型样式

export const suspectConfig = {itemStyle: {color:'#ffd661',   borderWidth: 1 ,borderType: 'solid'},lineStyle: {color:'#ffd661'}} // 抽出折线图新增疑似类型样式

export const confirmConfig = {itemStyle: {color:'#f06061',   borderWidth: 1 ,borderType: 'solid'},lineStyle: {color:'#f06061'}} // 抽出折线图新增确诊类型样式

export const nowConfirmConfig = {itemStyle: {color:'#ff7b7c',   borderWidth: 1 ,borderType: 'solid'},lineStyle: {color:'#ff7b7c'}} // 抽出折线图全国现有确诊类型样式（以及本土新增确诊）

export const totalConfirmConfig = {itemStyle: {color:'#9b0a0e',   borderWidth: 1 ,borderType: 'solid'},lineStyle: {color:'#9b0a0e'}} // 抽出折线图全国累计确诊类型样式