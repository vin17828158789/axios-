import axios from 'axios'
import Qs from 'qs'
import AllUrl from './ipConfig'
import { Message } from 'element-ui'

const Axios = axios.create({
    // 总
    baseURL: AllUrl.BaseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
        config.headers.Token_ = sessionStorage.token || ''
        config.headers.userIp = sessionStorage.userIp || '';
        return config
    },
    error => {
        Message.error('请求失败!')
        return Promise.reject(error)
    }
)

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    function (response) {
        const res = response.data
        console.log(res)
        return res
    },
    function (error) {
        Message.error(error.message)
        return Promise.reject(error.response.data)
    }
)

const Ajax = async ({ url, type, data, msg = '获取信息失败!' }) => {
    let c = null
    if (type === 'post') {
        if (!url.includes('uploadFile') && !url.includes('postFile')) {
            // for (const i in data) {
            //     data[i] = JSON.stringify(data[i]);
            // }
            data = Qs.stringify(data)
        }
        try {
            c = await Axios.post(url, data)
        } catch (error) {
            Message.error(msg)
            c = false
            console.log(error)
        }
    }
    if (type === 'get') {
        try {
            c = await Axios.get(url)
        } catch (error) {
            Message.error(msg)
            c = false
            console.log(error)
        }
    }
    return c
}

export default Ajax
