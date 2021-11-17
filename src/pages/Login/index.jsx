import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, message } from 'antd';
import { userLogin } from 'request'
import { useNavigate } from "react-router-dom";
import { initMethod } from 'store/actions'

import cx from 'classnames'
import './index.css'

const timer = 500

const Login = ({
  initMethod
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();

  const limitData = async () => {
    let result = await userLogin({ params: { username, password } })
    if (result) {
      sessionStorage.setItem('userinfo', JSON.stringify(result.data.list))
      message.success(result.data.msg, 2)
      navigate(`/layout`);
      initMethod(result.data.list)
    }
  }
  // 防抖
  const debounce = (fn, delay) => {
    return function () {
      if (fn.timer) {
        clearTimeout(fn.timer)
      }
      fn.timer = setTimeout(fn, delay)
    }
  }
  // (点击) 事件函数右侧直接套防抖，才可以起到防抖作用!
  const onFinish = debounce(limitData, timer)
  const onFinishFailed = (errorInfo) => {
    message.error('登录失败', 1)
  };

  const userNameChange = (val) => {
    setUsername(val.target.value)
  }
  const passwordChange = (val) => {
    setPassword(val.target.value)
  }

  return (
    <div className={cx('container')}>
      <div className={cx('loginCard')}>
        <h1>xiaoU后台</h1>
        <Form
          name="basic"
          className={cx('from')}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              value={username}
              onChange={userNameChange}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              value={password}
              onChange={passwordChange}
              placeholder="请输入密码" />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">login</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

/**
 * 
 * 传统的触发redux的reduce函数的方法是 将store层层专递，组件中使用，
 * this.props.store.dispatch(action对象)；
 * 这里是方法，也是把带有dispatch的方法挂载到组件上;
 * 使用这个方法，在传递action对象的同时，也触发了redux的reduce函数;
 * 注意： action 的 type会在每个reduce纯函数查找匹配到的type并处理
 *  
 * && 如此，可以使组件中的代码更加简洁，但增加了理解成本
 */

export default connect(
  () => {
    return {}
  },
  {
    initMethod
  })(Login)