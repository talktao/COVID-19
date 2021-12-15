// 封装get请求
export const httpGet = async(url:string) => {
    let result = await fetch(url)
    return result.json()
}
// 封装post请求
export const httpPost = async (url:string, data:object) => {
    let result = await fetch(url,{
        method:'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'/* 请求内容类型 */
        },
        body: JSON.stringify(data)
    })
    return result.json()
}