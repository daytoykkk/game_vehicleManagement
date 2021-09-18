import { message } from 'antd';
let ws = null
let url = "ws://z3773e6368.qicp.vip/socket/"
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
            message.success(res.data)
        };
    }

};

