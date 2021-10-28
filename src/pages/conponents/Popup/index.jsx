import React, { useState, useEffect } from 'react';
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
  treeTitle
}) => {
  const [pano, setPano] = useState('')   // 名称
  const [panI, setPanI] = useState('')   // 图标
  const [value, setValue] = useState(1); // 状态 1 正常 2 禁用

  const [panetwoSel, setPanetwoSel] = useState('请选择')  // 上级
  const [panta, setPanta] = useState('')            // 地址
  const [pane, setPane] = useState(1)               // tab 切换的值
  
  // const {} = treeTitle
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


  // 打开 关闭 弹框
  const handleOk = () => {
    // 新建 修改 数据
    let createNew = {}
    console.log('keyChange', pane);
    // 数据类型不对都不行 ，对象都会无法赋值
    // 判断是添加为一级还是二级
    let oneOrTwo = pane === 1 ? 0 : panetwoSel
    createNew = {
      pid: oneOrTwo,
      title: pano,
      icon: panI,
      status: value,
      url: panta,
      type: pane
    }
    console.log('createNew', createNew);
    // setPano('')
    // setPanI('')
    // setValue(1)
    // setPanetwoSel('')
    // setPanta()
    closeModal(createNew)
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
    console.log('pane----->', pane)
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
          // defaultActiveKey="1"
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

export default Popup