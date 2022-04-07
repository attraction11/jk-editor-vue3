import request from '~/utils/request'

export const fetchHomeDocs = (data: {
  id?: string,
  status?: string,
}) => {
  return request({
    method: 'POST',
    url: '/folder/getDocumentList',
    data
  })
}

export const fetchDocCreate = (data: {
  name: string
  folderId?: string
  creator: string
}) => {
  return request({
    method: 'POST',
    url: '/document/create',
    data
  })
}

export const getDocSave = () => {
  return request({
    method: 'POST',
    url: '/document/save'
  })
}
