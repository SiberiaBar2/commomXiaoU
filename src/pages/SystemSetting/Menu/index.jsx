import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react'
import {
  Table,
  Button,
  Tag,
  Popconfirm,
  message
} from 'antd'
import Popup from 'pages/conponents/Popup'
import {
  ToolOutlined,
  ClearOutlined
} from '@ant-design/icons';
import {
  menuList,
  addmenu,
  editmenu,
  delmenu
} from 'request'
import cx from 'classnames'
import './index.css'


const Menu = (props) => {
  const [show, setShow] = useState(false)
  const [treeList, setTreeList] = useState([])
  const Modalref = useRef()
  useEffect(() => {
    menuTree()
  }, [])
  const menuTree = async () => {
    const res = await menuList({})
    console.log('res- 树形结尾狗-->', res)
    console.log('Modalref', Modalref);
    // let copyList = JSON.parse(JSON.stringify(res.list))
    // let addKey = copyList.map(item => {
    //   let obj = {}
    //   obj['key'] = item.id
    //   return { ...item, ...obj }
    // })
    // console.log('addKey', addKey);

    res.list && setTreeList(res.list)


  }


  const confirm = async (val) => {
    console.log('record', val.id);


    let res = await delmenu({ params: { id: val.id } })
    // message.success('Click on Yes');
  }

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
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
  const openModal = (record, type) => {
    console.log('record, type', record, type);

    // 若传递了数据，就是点击修改，其他情况为新增
    if (type === 'edit') {
      Modalref.current.modalData(record, type)
    } else if (type === 'add') {
      Modalref.current.modalData(null, type)
    }
    setShow(true)
  }
  const closeModal = useCallback(
    async (val, addOrEdit) => {
      console.log('val, addOrEdit',val, addOrEdit);

      let params = { ...val }
      if (addOrEdit === 'add') {
        let res = await addmenu({ params })
        console.log('result----addmenu', res);
      } else if (addOrEdit === 'edit') {
        let res = await editmenu({ params })
        console.log('result----editmenu', res);
      }
      setShow(false)
    },
    [],
  )

  return (
    <div className={cx('menu-list')}>
      <div className={cx('list-top')}>
        <Button ref={Modalref} type="primary" onClick={() => openModal('record', 'add')}>新增</Button>
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
                <ToolOutlined onClick={() => openModal(record, 'edit')} />
                <Popconfirm
                  title="确定要删除吗?"
                  onConfirm={() => confirm(record)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <ClearOutlined />
                </Popconfirm>
              </div>
            }
          }
          ]}
        />
      </div>
      <Popup ref={Modalref} treeTitle={treeList} show={show} closeModal={closeModal} />
    </div>
  )
}

export default Menu