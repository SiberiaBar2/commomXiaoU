import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import {
  Button,
  Divider,
  Table,
  Tag,
  message,
  Popconfirm
} from 'antd'
import {
  TwitterOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import RoleWindow from 'pages/conponents/RoleWindow'
import {
  rolelist,
  roleadd,
  roleedit,
  roledel
} from 'request'
import 'utils/iconfont/iconfont.css'
import './index.css'
const Role = (props) => {

  const [roleList, setRoleList] = useState([])
  const [showWindow, setShowWindow] = useState(false)
  const roleRef = useRef()
  useEffect(() => {
    roleInit()
  }, []);
  const roleInit = async () => {   // 列表数据
    const res = await rolelist({})
    const { data } = res
    const { list } = data
    list && setRoleList(list)
  }

  const openWindow = (item, type) => {
    roleRef.current.roleData(item, type)
    setShowWindow(true)
  }

  const closeWindow = (item, type) => {
    roleEditAndAdd(item, type)
    setShowWindow(false)
  }
  // 新增修改删除
  const roleEditAndAdd = async (item, type) => {
    // 转化为后端需要的数据格式
    const copyItem = JSON.parse(JSON.stringify(item))
    copyItem.menus = copyItem.menus.join(',')
    if (type === 'Roleadd') {
      await roleadd({ params: { ...copyItem } })
      message.success('添加成功', 1)
      await roleInit()
    } else if (type === 'Roledit') {
      await roleedit({ params: { ...copyItem } })
      message.success('修改成功', 1)
      await roleInit()
    }
  }
  const roleDel = async (id) => {
    await roledel({ params: { id } })
    await roleInit()
    message.success('删除成功', 1)
  }

  const cancel = (e) => {
    message.warning('取消删除', 1);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text, record, index) => (
        <Tag icon={<TwitterOutlined />} color="#55acee">
          {record.id}
        </Tag>
      ),
    },
    {
      title: '角色名称',
      className: 'rolename',
      dataIndex: 'rolename',
      align: 'right',
      render: (text, record, index) => {
        return (
          <Tag icon={<YoutubeOutlined />} color="#cd201f">
            {record.rolename}
          </Tag>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record, index) => {
        return (
          record.status === 1
            ? <Tag color="success">success</Tag>
            : <Tag color="warning">warning</Tag>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <>
            <span className="icon iconfont edit"
              onClick={() => openWindow(record, 'Roledit')}>&#xe62c;</span>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => roleDel(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <i className="iconfont icon-biaodankongjianshanchu del"></i>
            </Popconfirm>
          </>
        )
      }
    }
  ];

  return (
    <>
      <Button
        type='primary'
        onClick={() => openWindow(undefined, 'Roleadd')}>
        新增
      </Button>
      <Divider>Role</Divider>
      <Table
        bordered
        columns={columns}
        dataSource={roleList}
        title={() => 'Header'}
        footer={() => 'Footer'}
        rowKey={record => {
          return record.id
        }}
      />
      <RoleWindow showWindow={showWindow} closeWindow={closeWindow} ref={roleRef} />
    </>
  )
}

export default Role