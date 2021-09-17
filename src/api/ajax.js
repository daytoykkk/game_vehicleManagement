// 发送异步ajax请求的函数模块，返回Promise对象
// 封装axios

import axios from "axios";
import { message } from 'antd';

const baseUrl = "http://47.106.84.138:8996"

// 请求拦截
axios.interceptors.request.use((config) => {
    let token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : '';
    config.headers = {token}
    return config;
}, error => {
    return Promise.reject(error);
});


export default function ajax(url, data = {}, method = 'GET', responceType = '', contentType = 'application/json') {

    // let token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : '';

    return new Promise((resolve, reject) => {
        let promise;
        // GET
        if (method === 'GET') {
            promise = axios.get(url, {
                params: data,
                responseType: responceType,
                // headers: {
                //     "token": token
                // }
            })
        }

        // POST
        if (method === 'POST') {
            promise = axios.post(url, data, {
                headers: {
                    "Content-Type": contentType
                }
            })
        }

        // PUT
        if (method === 'PUT') {
            promise = axios.put(url, null)
        }

        // DELETE 
        if (method === 'DELETE') {
            promise = axios.delete(url, {
                params: data,
            })
        }

        promise.then(res => {
            console.log(res);
            if (res.data.code === '-1') {
                message.warn('请先重新登陆！')
                window.location.href = baseUrl + '/index.html'
                reject('未登录')
            }
            resolve(res.data)
        }).catch(err => {
            console.warn(err)
        })

    })

}