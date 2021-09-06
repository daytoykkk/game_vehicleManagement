import {
    CarOutlined,
    UserOutlined,
    BarChartOutlined,
} from '@ant-design/icons';

const menuData = [
    {
        key: 1,
        icon: <CarOutlined />,
        name: "停车场管理",
        path: '/admin/parking'
    },
    {
        key: 2,
        icon: <UserOutlined />,
        name: "账号管理",
        path: '/admin/account'
    },
    {
        key: 3,
        icon: <BarChartOutlined />,
        name: "流水账单",
        path: '/admin/bill'
    },
]

export { menuData };