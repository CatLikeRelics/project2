import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// request 拦截器
// 对请求做一些处理
request.interceptors.request.use(
    config => {
        return config;
    }, error => {
        return Promise.reject(error);
    });


// request 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(response => {
    let res = response.data
    if (typeof res === 'string') {
        res = res ? JSON.parse(res) : res
    }
    return res;
}, error => {
    console.log('err' + error);
    return Promise.reject(error);
})

export default request

