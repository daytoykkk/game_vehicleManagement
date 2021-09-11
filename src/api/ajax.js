// 发送异步ajax请求的函数模块，返回Promise对象
// 封装axios

import axios from "axios";

export default function ajax(url, data = {}, method = 'GET',responceType='',contentType='application/json') {

    let token = sessionStorage.getItem("token")? sessionStorage.getItem("token") : '';

    return new Promise((resolve, reject) => {
        let promise;
        // GET
        if (method === 'GET') {
            promise = axios.get(url, {
                params:data,
                responseType: responceType,
                headers: {
                    "token": token
                }
            })
        }

        // POST
        if (method === 'POST') {
            promise = axios.post(url,data,{
                headers: {
                    "token": token,
                    "Content-Type": contentType
                }
            })
        }

        // PUT
        if(method === 'PUT') {
            promise = axios.put(url,null,{
                headers: {
                    "token": token
                }
            })
        }

        // DELETE 
        if(method === 'DELETE') {
            promise = axios.delete(url, {
                params:data,
                headers: {
                    "token": token
                }
            })
        }

        promise.then(res => {
            resolve(res.data)
        }).catch(err => {
            //message.error(err)
            console.log(err.msg)
        })

    })

}