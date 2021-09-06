import {
    PictureOutlined,
    UserOutlined,
    BarChartOutlined,
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

export { menuData };