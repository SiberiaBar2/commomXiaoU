import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import {
  Modal,
  Tree,
  Input,
  Radio
} from 'antd'
import {
  menuList
} from 'request'
import './index.css'
const RoleWindow = (props, ref) => {
  const [eventType, setEventType] = useState('')
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState([])
  const [state, setState] = useState(() => {
    return {
      id: 0,
      rolename: '',
      menus: [],
      status: 1
    }
  })
  const {
    showWindow,
    closeWindow
  } = props
  useEffect(() => {
    getMenuList()
  }, []);
  useImperativeHandle(ref, () => ({
    roleData,
  }));
  const roleData = (val, type) => {
    if (val && type === 'Roledit') {
      const { menus } = val
      const defaultKeys = menus.split(',')
      setState(() => {
        return {
          id: val.id,
          rolename: val.rolename,
          menus: defaultKeys,
          status: val.status
        }
      })
    } else {
      setState(() => {
        return {
          id: 0,
          rolename: '',
          menus: [],
          status: 1
        }
      })
    }
    setEventType(type)
  }
  // 渲染树形节点
  const chilDrenData = (childrenList) => {
    return (
      function () {
        return childrenList.map((ele) => {
          let eleObj = {}
          eleObj['key'] = ele.id.toString()
          return { ...ele, ...eleObj }
        })
      }()
    )
  }
  const getMenuList = async () => {
    const result = await menuList({})
    const { list } = result
    const copyTreeData = JSON.parse(JSON.stringify(list))
    let addWords = copyTreeData.map((item) => {
      let emptyObj = {}
      emptyObj['key'] = item.id.toString()
      item.children = chilDrenData(item.children)
      return { ...item, ...emptyObj }
    })
    addWords && setTreeData(addWords)
  }

  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    windowDataChange('menus', checkedKeysValue)
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  const handleOk = () => {
    closeWindow(state, eventType)
  };

  const handleCancel = () => {
    closeWindow()
  };
  const roleNameChange = (value) => {
    windowDataChange('rolename', value)
  }

  const radioChange = e => {
    windowDataChange('status', e.target.value)
  };
  const windowDataChange = (attrs, setAttr) => {
    setState((state) => {
      // 加JSON.parse 按钮才可切换
      // log前后信息不一致
      let newState = JSON.parse(JSON.stringify(state))
      Object.defineProperty(newState, attrs, {
        value: setAttr,
        writable: true
      })
      return newState
    })
  }
  return (
    <>
      <Modal
        title={eventType}
        visible={showWindow}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Input
          addonBefore="角色名称"
          value={state.rolename}
          onChange={(e) => roleNameChange(e.target.value)} />
        <Tree
          checkable
          className="roletree"
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={state.menus}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
        <Radio.Group onChange={radioChange} value={state.status}>
          <Radio value={1}>正常</Radio>
          <Radio value={2}>禁用</Radio>
        </Radio.Group>
      </Modal>
    </>
  )
}

export default forwardRef(RoleWindow)