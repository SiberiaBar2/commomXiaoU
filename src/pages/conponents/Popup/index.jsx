import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Modal,
  Button,
  Tabs,
  Input,
  Radio,
  Select
} from 'antd';
import cx from 'classnames'
import './index.css'

const { TabPane } = Tabs;
const { Option } = Select;

const Popup = ({
  show,
  closeModal,
  treeTitle,
}, ref) => {
  const [pano, setPano] = useState('')   // 名称
  const [panI, setPanI] = useState('')   // 图标
  const [value, setValue] = useState(1); // 状态 1 正常 2 禁用

  const [itemid, setItemId] = useState(0)
  const [panetwoSel, setPanetwoSel] = useState('请选择')  // 由于select变化的关系， 只能保存上级 
  const [panta, setPanta] = useState('')            // 地址
  const [pane, setPane] = useState(1)               // tab 切换的值
  const [addOrEdit, setAddOrEdit] = useState('')
  //react规定，必须使用useImperativeHandle方法，来保存并抛出想要传递给父组件的方法或者数据，
  // 第一个参数是ref,第二个参数是函数，返回想要抛出的对象集合
  useImperativeHandle(ref, () => ({
    modalData,
  }));

  // 回显
  const modalData = (val, type) => {
    console.log('说啥呢', val, type);
    // 如果是修改就回显
    if (val && type === 'edit') {
      setPano(val.title)
      setPanI(val.icon)
      setPanetwoSel(() => {
        return val.pid === 0
          ? '请选择'
          : val.pid
      })
      setItemId(val.id)
      setValue(val.status)
      setPanta(val.url)
      setPane(val.type)
    } else {
      // 否则就清空表单
      resetData()
    }
    // 无论新增还是修改 type都必须保存下来
    setAddOrEdit(type)
  }
  const callback = (key) => {
    console.log(key);
    setPane(() => {
      return Number(key)
    })
  }


  // pane2 select address radio是同一个
  const selectChange = (value) => {
    console.log(`selected ${value}`);
    setPanetwoSel(() => {
      return value
    })
  }
  const pantAdd = (e) => {
    setPanta(() => {
      return e.target.value
    })
  }

  // 获取焦点 搜索
  const onBlur = () => {
    console.log('blur');
  }

  const onFocus = () => {
    console.log('focus');
  }

  const onSearch = (val) => {
    console.log('search:', val);
  }

  // 重置数据
  const resetData = () => {
    setPano('')
    setPanI('')
    setValue(1)
    setPanetwoSel('')
    setPanta()
    setPane(1)
    setAddOrEdit('')
    setItemId('')
  }
  // 打开 关闭 弹框
  const handleOk = () => {
    // 新建 、修改数据
    let createNew = {}
    console.log('keyChange', pane);
    console.log('addOrEdit', addOrEdit);
    // 数据类型不对都不行 ，对象都会无法赋值
    //  1 为目录 表示添加最高一个层级的 写死， 其他情况为上级，就动态选择
    console.log('pane', pane);

    let oneOrTwo = pane === 1 ? 0 : panetwoSel
    createNew = {
      pid: oneOrTwo,
      title: pano,
      icon: panI,
      status: value,
      url: panta,
      type: pane
    }
    // 如果为是修改，就再加一个字段
    if (addOrEdit === 'edit') {
      createNew.id = itemid
    }
    console.log('createNew, addOrEdit', createNew, addOrEdit);

    closeModal(createNew, addOrEdit)
  };

  const handleCancel = () => {
    closeModal()
  };
  // pane1
  // 名称 图标  radio
  const paneName = (e) => {
    setPano(() => {
      return e.target.value
    })
  }
  const paneIcon = (e) => {
    setPanI(() => {
      return e.target.value
    })
  }
  const radiOnChange = e => {
    setValue(() => {
      return e.target.value
    })
  };

  const renderPano = () => {
    // 居然可以拿到实时的
    // console.log('pane----->', pane)
    return (
      <>
        <Input
          value={pano}
          addonBefore="名称"
          onChange={paneName}
          className={cx('popup-inp')} />
        <Input
          value={panI}
          onChange={paneIcon}
          className={cx('popup-inp')}
          addonBefore="图标" />
        <div className={cx('popup-radio')}>
          <div className={cx('radio-status')}>状态</div>
          <Radio.Group onChange={radiOnChange} value={value}>
            <Radio value={1}>正常</Radio>
            <Radio value={2}>禁用</Radio>
          </Radio.Group>
        </div>
      </>
    )
  }
  const renderPanT = () => {
    return (
      <>
        <div className="popup-selo">
          <div className={cx('popup-up')}>上级</div>
          <Select
            showSearch
            value={panetwoSel}
            className={cx('popup-sel')}
            placeholder="请选择"
            optionFilterProp="children"
            onChange={selectChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {treeTitle.map((item, index) => {
              return <Option key={item + index} value={item.id}>{item.title}</Option>
            })}
          </Select>
        </div>
        <Input
          value={pano}
          addonBefore="名称"
          onChange={paneName}
          className={cx('popup-inp')} />
        <Input
          value={panta}
          className={cx('popup-inp')}
          onChange={pantAdd}
          addonBefore="地址" />
        <div className={cx('popup-radio')}>
          <div className={cx('radio-status')}>状态</div>
          <Radio.Group
            onChange={radiOnChange}
            value={value}>
            <Radio value={1}>正常</Radio>
            <Radio value={2}>禁用</Radio>
          </Radio.Group>
        </div>
      </>
    )
  }
  return (
    <div>
      <Modal title="修改"
        visible={show}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Tabs
          value={pane}
          className={cx('tabpane')}
          onChange={callback}>
          <TabPane tab="目录" key="1">
            {renderPano()}
          </TabPane>
          <TabPane tab="菜单" key="2">
            {renderPanT()}
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}
//必须通过forwardRef方法抛出函数组件
export default forwardRef(Popup)