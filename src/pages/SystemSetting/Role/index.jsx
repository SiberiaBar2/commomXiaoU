import React, { useState, useEffect, useRef } from 'react'
import { Button, Divider, Table, Tag } from 'antd'
import {
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import RoleWindow from 'pages/conponents/RoleWindow'
import { rolelist } from 'request'
import 'utils/iconfont/iconfont.css'
import './index.css'
const Role = (props) => {

  const [roleList, setRoleList] = useState([])
  const [showWindow, setShowWindow] = useState(false)
  const roleRef = useRef()
  useEffect(() => {
    initRole()
  }, []);
  const initRole = async () => {
    const res = await rolelist({})
    const { data } = res
    const { list } = data
    list && setRoleList(list)
  }

  const openWindow = (item, type) => {
    roleRef.current.roleData(item, type)
    setShowWindow(true)
  }

  const closeWindow = () => {
    setShowWindow(false)
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
              onClick={() => openWindow(record, 'Roledit')}
            >&#xe62c;</span>
            <i className="iconfont icon-biaodankongjianshanchu del"></i>
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