import {
    CarOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

const menuData = [
    {
        key: 1,
        icon: <CarOutlined />,
        name: "车位管理",
        path: '/guard/stall'
    },
    {
        key: 2,
        icon: <ContainerOutlined />,
        name: "记录管理",
        path: '/guard/log'
    },
]

export { menuData };