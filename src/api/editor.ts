import request from '~/utils/request'

// export const getUploadImage = () => {
//   return request({
//     method: 'POST',
//     url: '/image/uploadImage'
//   })
// }

// export const getDocImage = () => {
//   return request({
//     method: 'POST',
//     url: '/image/get'
//   })
// }

export const getUploadDocx = () => {
  return request({
    method: 'POST',
    url: '/document/uploadDocx'
  })
}

export const getExportDocx = () => {
  return request({
    method: 'POST',
    url: '/document/exportDocx'
  })
}
