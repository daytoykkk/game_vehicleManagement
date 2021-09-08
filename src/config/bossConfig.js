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

export { 
    menuData,
    bossAreaColumns,
 };