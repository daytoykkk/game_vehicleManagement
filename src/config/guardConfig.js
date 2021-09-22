import {
    CarOutlined,
    ContainerOutlined,
    FormOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { message } from 'antd'
import { resHandleComplaint } from '../api'


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
    {
        key: 3,
        icon: <FormOutlined />,
        name: "用户反馈",
        path: '/guard/complaint'
    },
    {
        key: 4,
        icon: <CarOutlined />,
        name: "车位实况",
        path: '/guard/parks'
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

const handleComplaint = async (text) => {
    let array = new Array(0);
    array.push(text.complaintId)
    let res = await resHandleComplaint(array)
    if(res.code===1){
        message.success('处理成功')
    }

}

const guardComplaintColumns = [
    {
        title: '用户ID',
        dataIndex: 'openId',
        key: 'openId',
        width: '180px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '停车位ID',
        dataIndex: 'parkId',
        key: 'parkId',
        width: '120px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '反馈内容',
        dataIndex: 'content',
        key: 'content',
        width: '240px',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        filters: [
            { text: '已处理', value: '1' },
            { text: '未处理', value: '0' },
        ],
        width: '100px',
        align: 'center',
        render: (text) => {
            return text === 1 ? '已处理' : '未处理'
        }
    },
    {
        title: '编辑',
        key: 'action',
        width: '120px',
        align: 'center',
        ellipsis: true,
        render: (text, record) => (
            <EditOutlined onClick={()=>handleComplaint(record)} style={{'cursor':'pointer'}} />
        )
    },
]

export { menuData, guardLogColumns, guardComplaintColumns };