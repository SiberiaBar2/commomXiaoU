
import axios from 'axios'
import { message } from 'antd';



axios.interceptors.request.use(async (config) => {
  const userInfo = sessionStorage.getItem('userinfo')
  // userInfo as tokenType
  // 既然 string | null 的值不能赋值给 string ，就先判断它有没有值
  let conversionSession = await (userInfo && JSON.parse(userInfo))
  console.log('userInfo', conversionSession)
  // config.headers.userToken = userInfo.token
  // if (config !== null) {
  // config && config.headers && config.headers.userToken = conversionSession.token
  // }
  // 现在为什么 Object.defineProperty 不会报错了？？
  // 为什么米有为config 的headers属性定义类型也没有报错？
  Object.defineProperty(config.headers, 'authorization', {
    value: conversionSession.token
  })
  console.log('config--->', config.headers);

  return config
})

axios.interceptors.response.use((config) => {
  if (config.data) { // 对象可能未定义，那就就套两层判断！！
    if (config.data.code !== 200) {
      message.error('返回数据异常！', 3, () => {
        console.log('返回异常');
      })
    }
  }
  return config.data
})


export default axios
