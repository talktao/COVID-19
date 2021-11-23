// 封装get请求
export const httpGet = async(url:string) => {
    let result = await fetch(url)
    return result.json()
}
// 封装post请求
export const httpPost = async (url:string,data:object) => {
    let result = await fetch(url,{
        method:'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'/* 请求内容类型 */
        },
        body:paramsPostBody(data)
    })
    return result.json()
}
//格式化data
function paramsPostBody(obj:object){
    let result = '';//接受最后结果
    let item;
    for(item in obj){
        result += '&'+item+'='+encodeURIComponent(obj[item])
    }
    if(result){
        result = result.slice(1)//去掉第一个&
    }
    return result
}