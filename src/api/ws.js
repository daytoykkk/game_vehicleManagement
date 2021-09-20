import { message } from 'antd';
let ws = null
let url = "ws://47.106.84.138:8996/socket/"
let connectRetryCount = 0


// 连接ws
export const handleInitWs = () => {
    let token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ''
    if (token!=='') {
        ws = new WebSocket(url + token);
        ws.onopen = () => {
            console.log("连接服务端成功了");
            connectRetryCount = 0;
        };
        ws.onclose = () => {
            message.error("连接服务端失败");
            connectRetryCount++;
            setTimeout(() => {
                handleInitWs();
            }, 500 * connectRetryCount);
        };
        ws.onmessage = (res) => {
            message.success(JSON.parse(res.data).message)
        };
    }

};

