import request from '~/utils/request'
import { ILoginInfo } from './types/common'

export const getUploadImage = () => {
  return request<ILoginInfo>({
    method: 'POST',
    url: '/image/uploadImage'
  })
}

export const getDocImage = () => {
  return request<ILoginInfo>({
    method: 'POST',
    url: '/image/get'
  })
}

export const getDocBody = () => {
  return request<ILoginInfo>({
    method: 'POST',
    url: '/document/get'
  })
}

export const getUploadDocx = () => {
  return request<ILoginInfo>({
    method: 'POST',
    url: '/document/uploadDocx'
  })
}

export const getExportDocx = () => {
  return request<ILoginInfo>({
    method: 'POST',
    url: '/document/exportDocx'
  })
}
