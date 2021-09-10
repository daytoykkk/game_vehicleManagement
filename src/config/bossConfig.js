import {
    PictureOutlined,
    UserOutlined,
    BarChartOutlined,
    EditOutlined,
} from '@ant-design/icons';

const menuData = [
    {
        key: 1,
        icon: <PictureOutlined />,
        name: "区域管理",
        path: '/boss/area'
    },
    {
        key: 2,
        icon: <UserOutlined />,
        name: "账号管理",
        path: '/boss/account'
    },
    {
        key: 3,
        icon: <BarChartOutlined />,
        name: "流水账单",
        path: '/boss/bill'
    },
]

const bossAreaColumns = [
    {
        title: '区域编号',
        dataIndex: 'areaId',
        key: 'areaId',
        width: '160px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '区域名称',
        dataIndex: 'areaName',
        key: 'areaName',
        width: '240px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '区域管理员',
        dataIndex: 'areaUser',
        key: 'areaUser',
        width: '200px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '编辑资料',
        key: 'action',
        width: '200px',
        align: 'center',
        ellipsis: true,
        render: (text, record) => (
            <EditOutlined />
        ),
      },
]

 // 获取近七日时间数组
 const getSevenDay = () => {
    let array = []
    for(let i=-6;i<1;i++) {
        array.push(getDay(i) + " 00:00:00")
    }
    return array;
}

const doHandleMonth = (month) => {
    let m = month;
    if(month.toString().length === 1){
     m = "0" + month;
    }
    return m;
}

const getDay = (day) => {
    let today = new Date();
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear+"-"+tMonth+"-"+tDate;
}

export { 
    menuData,
    bossAreaColumns,
    getSevenDay,
 };