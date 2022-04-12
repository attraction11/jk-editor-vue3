import request from '~/utils/request'

export const fetchHomeDocs = (params: {
  id?: string,
}) => {
  return request({
    method: 'GET',
    url: '/folder/getDocumentList',
    params: {
      id: params.id
    }
  })
}

export const fetchDocCreate = (data: {
  folderId?: string
  name: string
  creator: string
}) => {
  return request({
    method: 'POST',
    url: '/document/create',
    data
  })
}

export const getDocSave = (data: {
  id: string
  content: string
  modifier: string
}) => {
  return request({
    method: 'POST',
    url: '/document/save',
    data
  })
}

export const getDocBody = (data: {
  id: string
}) => {
  return request({
    method: 'POST',
    url: '/document/get',
    data
  })
}
