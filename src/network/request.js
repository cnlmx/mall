import axios from 'axios'

export function request (config) {
  // 创建实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // 拦截器
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
      console.log(err)
    }
  )
  instance.interceptors.response.use(
    res => {
      return res
    },
    err => {
      console.log(err)
    }
  )

  // 发送网络请求
  return instance(config)
}
