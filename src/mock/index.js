import Mock from 'mockjs'
import user from './user.js'

Mock.mock('/mock/data', 'get', () => {
  return user.featureDate
})
