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

const guardLogColumns = [
    {
        title: '用户ID',
        dataIndex: 'openId',
        key: 'openId',
        width: '200px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: '150px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        width: '150px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '收费',
        dataIndex: 'cost',
        key: 'cost',
        width: '100px',
        align: 'center',
        ellipsis: true,
    },
]

export { menuData, guardLogColumns };