import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Table, Button, Tag } from 'antd'
import Popup from 'pages/conponents/Popup'
import {
  ToolOutlined,
  ClearOutlined
} from '@ant-design/icons';
import {
  menuList,
  addmenu
} from 'request'
import cx from 'classnames'
import './index.css'
import { logDOM } from '@testing-library/dom';

const Menu = (props) => {
  const [show, setShow] = useState(false)
  const [treeList, setTreeList] = useState([])
  useEffect(() => {
    menuTree()
  }, [])
  const menuTree = async () => {
    const res = await menuList({})
    console.log('res- 树形结尾狗-->', res)
    // let copyList = JSON.parse(JSON.stringify(res.list))
    // let addKey = copyList.map(item => {
    //   let obj = {}
    //   obj['key'] = item.id
    //   return { ...item, ...obj }
    // })
    // console.log('addKey', addKey);

    res.list && setTreeList(res.list)
  }
  // 取数组对象中所需要的
  // let treeTitle = treeList.map(item => {
  //   let obj = {}
  //   obj['title'] = item.title
  //   obj['id'] = item.id
  //   return obj
  // })
  // console.log('treeTitle', treeTitle);

  let arr = [
    { name: '牛恒', age: 178, sex: '男' },
    { name: '牛恒', age: 178, sex: '男' },
    { name: '牛恒', age: 178, sex: '男' },
  ]

  let str = [
    { what: '什么呢' },
    { how: '是的呀' },
    { why: '嗨呀呀' },
  ]

  let resOne = arr.map((item, index) => {
    return { ...item, ...str[index] }
  })
  // console.log('人的呢', resOne);

  // console.log('treeTitle', treeTitle);

  let str1 = { what: '什么呢', how: '是的呀', why: '嗨呀呀' }
  // console.log('Object.keys(str1)', Object.keys(str1));
  // console.log('Object.keys(str1)', Object.values(str1));

  for (let key in arr) {
    // console.log('key', key);
    // console.log('item', arr[key]);
    // return {...}
  }
  const openModal = () => {
    // console.log('ccccccccccccccccccc');

    setShow(true)
  }
  const closeModal = useCallback(
    async (val) => {
      let params = { ...val }
      let res = await addmenu({ params })
      console.log('result----addmenu', res);

      setShow(false)
    },
    [],
  )

  return (
    <div className={cx('menu-list')}>
      <div className={cx('list-top')}>
        <Button type="primary" onClick={openModal}>新增</Button>
      </div>
      <div className={cx('list-content')}>
        <Table
          className="common-table"
          dataSource={treeList}
          pagination={false}
          rowKey={record => {
            return record.id
          }}
          expandable={{
            // expandedRowRender: record => {
            //   console.log('record for children', record);
            //   record.children.map(item => {
            //     return <div key={item.id}>
            //       <Tag color="red">{item.id}</Tag>
            //       <Tag color="cyan">{item.title}</Tag>
            //       <Tag color="blue" >{item.icon ? item.icon : 'children now have no'}</Tag>
            //       <Tag color="purple" >{item.url ? item.url : 'children have no'}</Tag>
            //       <Button
            //         type='primary'
            //         danger={record.status === 1 ? false : true}>
            //         {record.status === 1 ? '生效' : '失效'}
            //       </Button>
            //     </div>
            //   })
            // },
            // 控制展开选项的显示与否
            rowExpandable: record => record.children ? true : false
          }}
          columns={[{
            filterIcon: () => <Tag color="red">sad</Tag>,
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            render: (text, record, index) => {
              return <Tag
                key={record.id}
                color="red">{record.id}</Tag>
            }
          },
          {
            title: '名称',
            dataIndex: 'title',
            width: '10%',
            render: (text, record, index) => {
              return <Tag
                key={record.id}
                color="cyan">{record.title}</Tag>
            }
          },
          {
            title: '图标',
            dataIndex: 'icon',
            width: '20%',
            render: (text, record, index) => {
              return <Tag
                color="blue"
                key={record.id}>{record.icon ? record.icon : 'now have no'}</Tag>
            }
          },
          {
            title: '地址',
            dataIndex: 'url',
            width: '20%',
            render: (text, record, index) => {
              return <Tag
                color="purple"
                key={record.id}>{record.url ? record.url : 'have no'}</Tag>
            }
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: '10%',
            render: (text, record, index) => {
              return <Button
                type='primary'
                key={record.id}
                danger={record.status === 1 ? false : true}>
                {record.status === 1 ? '生效' : '失效'}</Button>
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '10%',
            render: (text, record, index) => {
              return <div
                key={record.id}
                className={cx('list-icon')}>
                <ToolOutlined onClick={openModal} />
                <ClearOutlined />
              </div>
            }
          }
          ]}
        />
      </div>
      <Popup treeTitle={treeList} show={show} closeModal={closeModal} />
    </div>
  )
}

export default Menu