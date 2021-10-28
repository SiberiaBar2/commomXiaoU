import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, message } from 'antd';
import { userLogin } from 'request'
import { useHistory } from "react-router-dom";
import { initMethod } from 'store/actions'

import cx from 'classnames'
import './index.css'


const Login = ({
  initMethod
}) => {
  
  let history = useHistory();
  const onFinish = async (values) => {
    const { username, password } = values
    let result = await userLogin({ params: { username, password } })
    if (result) {
      // 都没存进去，拿个毛线 
      sessionStorage.setItem('userinfo', JSON.stringify(result.data.list))
      message.success(result.data.msg, 2)
      history.push(`/layout`);
      initMethod(result.data.list)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('loginCard')}>
        <h1>xiaoU后台</h1>
        <Form
          name="basic"
          className={cx('from')}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              placeholder="请输入密码"
            />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(
  () => {
    console.log('高阶组件')
    return {}
  },
  {
    initMethod
  })(Login)