import request from '~/utils/request'
import { ILoginInfo } from './types/common'

export const getHomeDocs = () => {
  return request<ILoginInfo>({
    method: 'POST',
    url: '/folder/getDocumentList'
  })
}

export const getDocCreate = () => {
  return request<ILoginInfo>({
    method: 'POST',
    url: '/document/create'
  })
}

export const getDocSave = () => {
  return request<ILoginInfo>({
    method: 'POST',
    url: '/document/save'
  })
}
