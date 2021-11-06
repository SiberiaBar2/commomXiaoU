
import React from 'react';
import axios from 'axios'
import { message } from 'antd';
import { useHistory } from "react-router-dom";


// 若是给函数参数指定类型，那就成了强类型， 外部如果不传都会报错
export const BaseApi = ({ method = 'get', header = {}, params = {}, path = '' }) => {
  // let history = useHistory();
  let promise = new Promise((reslove, reject) => {
    let option = {
      url: path,
      method,
      timeout: 120000
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

    axios.interceptors.request.use((config) => {
      if (config) {
        const userInfo = JSON.parse(sessionStorage.getItem('userinfo')) || '{}'
        // 将登录凭证通过自定义请求头发送给数据接口
        config.headers.authorization = userInfo.token
        return config
      }
    })

    // axios.interceptors.response.use((config) => {
    //   console.log('config-data', config);
    //   if ((config.data.code !== 200) || (config.code === 403)) {
    //     message.error('返回数据异常！', 2, () => {
    //       console.log('返回异常');
    //     })
    //     return
    //   } else if ((config.data.code === 403) || (config.code === 403)) {
    //     message.error('请登录', 2, () => {
    //       console.log('请重新登录');
    //     })
    //     return
    //     // history.push('/login')
    //   } else {
    //     return config.data
    //   }
    // })

    axios(options)
      .then((res) => {
        reslove(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

// 三个async无用，但是第一个axios用promise 来reslove 和 reject 返回值， 后面两个调用函数使用async await就能拿到值了

