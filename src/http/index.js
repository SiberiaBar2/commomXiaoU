
import React from 'react';
import axios from 'axios'
import { message } from 'antd';
import { useHistory } from "react-router-dom";


// 若是给函数参数指定类型，那就成了强类型， 外部如果不传都会报错
export const BaseApi = ({ method = 'get', header = {}, params = {}, path = '' }) => {
  // console.log('查看BaseApi', method, header, params);

  // let history = useHistory();
  let promise = new Promise((reslove, reject) => {
    let option = {
      url: path,
      method,
      timeout: 120000,
      // headers:header, 
      // authorization: ''
    }

    let options = option 

    if (method === 'get') {
      options.params = params
    } else if (['post', 'put'].includes(method)) {
      options.data = params
    }

    if (header['Content-Type']) {
      header['Content-Type'] = 'application/json'
    }
    // const userInfo = sessionStorage.getItem('userinfo') || '{}'
    // const userInfos = JSON.parse(userInfo) as tokenType
    // 将登录凭证通过自定义请求头发送给数据接口
    // options.headers.authorization = userInfos.token
    // options.headers.header = header
    // Object.defineProperty(options.headers, 'header', {
    //   value: header
    // })
    // Object.defineProperty(options.headers, 'authorization', { 
    //   value: userInfos.token
    // })
    console.log('options', options);

    axios.interceptors.request.use((config) => {
      if (config) {
        const userInfo = JSON.parse(sessionStorage.getItem('userinfo')) || '{}'
        console.log('userInfo',userInfo);
        // 将登录凭证通过自定义请求头发送给数据接口
        config.headers.authorization = userInfo.token
        console.log('config.headers',config.headers)
        return config
      }
    })

    // axios.interceptors.response.use((config) => {
    //   // if (config.data) { // 对象可能未定义，那就就套两层判断！！
    //     if (config.data.code !== 200) {
    //       message.error('返回数据异常！', 2, () => {
    //         console.log('返回异常');
    //       })
    //     // }
    //     if (config.data.code === 403) {
    //       message.error('请登录', 2, () => {
    //         console.log('重新登录');
    //       })
    //       // history.push('/login')
    //     }
    //     return config.data
    //   }
    // })

    axios(options)
      .then((res) => {
        console.log('看返回值', res);
        reslove(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

// 三个async无用，但是第一个axios用promise 来reslove 和 reject 返回值， 后面两个调用函数使用async await就能拿到值了

