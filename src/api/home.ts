import request from '~/utils/request'
import { ILoginInfo } from './types/common'

export const getHomeDocs = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/home/docs'
  })
}
