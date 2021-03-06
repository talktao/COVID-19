
import { useEffect, useRef, useState } from 'react'
// 排除value为0的情况
export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// let a: object
// a = { name: 'jack' }
// a = () => { }
// a = new RegExp('')

// let b: { [key: string]: unknown }
// b = { name: 'jack' }
// b = () => { }

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: {[key: string]: unknown}) => {
	if (!object) {
    return {};
  }
	const result = { ...object }
	Object.keys(result).forEach(key => {
		//将对象key所对应的值赋值给value
		const value = result[key]
		// 0
		if (isVoid(value)) {
			delete result[key]
		}
	})
	return result
}

// 页面挂载时只执行一次的hook
export const useMount = (callback: () => void) => {
	useEffect(() => {
		callback()
		// TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

// 延时执行函数  后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		// 每次在value变化以后，设置一个定时器
		const timeout = setTimeout(() => setDebouncedValue(value), delay)
		// 每次再上一个useEffect处理完之后再运行
		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}

// 数组的增删清空
export const useArray = <T>(initialArray: T[]) => {
	const [value, setValue] = useState(initialArray)
	return {
		value,
		setValue,
		add: (item: T) => setValue([...value, item]),
		clear: () => setValue([]),
		removeIndex: (index: number) => {
			const copy = [...value]
			copy.splice(index, 1)
			setValue(copy)
		}
	}
}

// 自定义项目浏览器顶部标签页的title
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
	// useRef持久化变量，返回的 ref 对象在组件的整个生命周期内保持不变
	const oldTitle = useRef(document.title).current
	// 页面加载时: 旧title
	// 加载后: 新title
	useEffect(() => {
		document.title = title
	}, [title])
	
	useEffect(() => {
		return () => {
			if (!keepOnUnmount) {
				// 如果不指定依赖（即监听的数据），独到的就是旧title
				document.title = oldTitle
			}
		}
	},[keepOnUnmount, oldTitle])
}

// 返回根路由
export const resetRoute = () => window.location.href = window.location.origin

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/** 
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */

export const useMountedRef = () => {
	const mountedRef = useRef(false)
	
	useEffect(() => {
		mountedRef.current = true
		return () => {
			mountedRef.current = false
		}
	})
	return mountedRef
 }

 /**
  * 传入一个数字，将其转为字符串并获取第一个字符
  */
export const useCharAt = (param?: Number | String) => {
	if(typeof param == "string"){
		return param.substr(0,1)
	}else if(typeof param == "number"){
		param = param.toString()
		return param.substr(0,1)
	}
}

/**
 * 传入一个数组对象，根据某一相同value合并成新的数组
 */
interface paramsObj {
	value?: any
}
export const handlerDatas = (arr:[], value:string) => {
	let obj = {};
	arr.forEach((item:paramsObj, index) => {
		let { value } = item;
		if (!obj[value]) {
			obj[value] = {
				value,
				children:[]
			}
		}
		obj[value].children.push(item);
	});
	return Object.values(obj); // 最终输出
  }

/**
*传入一个数组，切割中国省份字符串，只保留名称; 省，市，自治区等字符去除 
*/
interface provinceProps {
	name: string,
	value: number
}
export const getProvinceParams = (arr:provinceProps[])=>arr.map(({name,value})=>[4,6].includes(name.length)?{name: name.slice(0,3),value}:{name: name.slice(0,2),value})
// export const getProvinceParams = (arr:provincePros[]) => {
// 	return arr.map(item=>{
// 		if(item.name.length === 4 || item.name.length === 6){
// 			return {
// 				name:item.name.slice(0, 3),
// 				value: item.value
// 			}
// 		}else {
// 			return {
// 				name: item.name.slice(0, 2),
// 				value: item.value
// 			}
// 		}
// 	})
// }


export const toYMDHMS = (date: any) => {	
    if (!date) {
        return "";
    }
    date = new Date(date);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
};
