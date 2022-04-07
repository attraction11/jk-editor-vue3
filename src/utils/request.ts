import axios, { AxiosRequestConfig } from 'axios'
import { store } from '~/store/'
import router from '~/router/'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户身份 token
  const user = store.state.user
  if (!config?.headers) {
    throw new Error('Expected \'config\' and \'config.headers\' not to be undefined')
  }
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 控制登录过期的锁
let isRefreshing = false

// 响应拦截器
request.interceptors.response.use(function (response) {
  const status = response.data.status
  console.log('response: ', response)

  // 正确的情况 (响应的不是预期的结构数据 或 status === 200)
  if (!status || status === 200) {
    return response
  }

  // 错误情况：比如 token 无效...

  // 统一处理登录过期
  if (status === 410000) {
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    console.error(response.data.msg || '您的登录已过期，即将重新登录')

    // 清除本地过期的登录状态
    store.commit('setUser', null)
    // 跳转到登录页面
    router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.fullPath
      }
    })

    // 在内部消化掉这个业务异常
    return Promise.reject(response)
  }

  // 其它错误情况
  console.error(response.data.msg || '请求失败，请稍后重试')
  // 手动返回一个 Promise 异常
  return Promise.reject(response)
}, function (error) {
  console.error(error.console || '请求失败，请稍后重试')
  return Promise.reject(error)
})

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    if (res.data.code === '0') {
      return (res.data.data || res.data) as T
    } else {
      console.error(res.data.msg || '请求失败，请稍后重试')
      return Promise.reject(res.data.msg)
    }
  })
}
