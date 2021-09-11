import {
    CarOutlined,
    UserOutlined,
    BarChartOutlined,
    EditOutlined,
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

const adminParkColumns = [
    {
        title: '停车场编号',
        dataIndex: 'parkId',
        key: 'parkId',
        width: '120px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '停车场名称',
        dataIndex: 'parkName',
        key: 'parkName',
        width: '240px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '经度',
        dataIndex: 'lng',
        key: 'lng',
        width: '100px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '纬度',
        dataIndex: 'lat',
        key: 'lat',
        width: '100px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '车位数',
        dataIndex: 'placeNum',
        key: 'placeNum',
        width: '100px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        filters: [
            { text: '正常', value: '1' },
            { text: '维修中', value: '0' },
          ],
        width: '100px',
        align: 'center',
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

export { menuData,adminParkColumns };