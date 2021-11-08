import React, { useState, useEffect } from 'react'
import { Menu, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import cx from 'classnames'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import './index.css'

const { SubMenu } = Menu;

const Navabar = ({
  navUseFunction,
  menus
}) => {
  const [collapsed, setCollapsed] = useState(false)
  let navigate = useNavigate();
  // let history = useHistory();

  const toggleCollapsed = () => {
    setCollapsed(collapsed => {
      return !collapsed
    })
    navUseFunction && navUseFunction(!collapsed)
  };


  return (
    <div
      className={cx('navabar')}
      style={{ width: collapsed ? 80 : 226 }}>
      <div
        className={cx('nav-btn-wrap')}
        style={{ width: collapsed ? 80 : 226 }}>
        <Button
          type="primary"
          className={cx('nav-btn-pri')}
          onClick={toggleCollapsed}
        >
          {
            React.createElement(collapsed
              ? MenuUnfoldOutlined
              : MenuFoldOutlined)
          }
        </Button>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        className={cx('nav-menu')}
        inlineCollapsed={collapsed}
      >
        <Menu.Item
          key="only"
          onClick={() => navigate('/layout')}
          icon={<PieChartOutlined />} >
          管理中心
        </Menu.Item>
        {
          menus && menus.map((item) => {
            return (
              <SubMenu
                key={item.id}
                icon={<MailOutlined />}
                title={item.title}>
                {
                  item
                  && item.children
                  && item.children.map((ele, ind) => {
                    return (
                      <Menu.Item
                        key={ele.id}
                        onClick={() => navigate(`/layout${ele.url}`)}
                        >
                        {ele.title}
                      </Menu.Item>
                    )
                  })}
              </SubMenu>
            )
          })
        }
      </Menu>
    </div>
  )
}

export default Navabar