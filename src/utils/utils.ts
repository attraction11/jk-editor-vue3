export const downExcelBlob = (url: string, fileName: string) => {
  const oReq = new XMLHttpRequest()
  oReq.open('POST', url, true)
  oReq.responseType = 'blob'
  oReq.setRequestHeader('Content-Type', 'application/json')
  oReq.onload = function (oEvent) {
    const content = oReq.response
    const elink = document.createElement('a')
    elink.download = `${fileName}.xlsx` // xls   因为后台输入是csv'格式，用xls显示的不理想
    elink.style.display = 'none'
    const blob = new Blob([content])
    // var blob = new Blob([content], { type: 'application/vnd.ms-excel'});//text/csv,charset=GBK
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    document.body.removeChild(elink)
  }
  oReq.send()
}

export const downExcel = (url: string) => {
  const elink = document.createElement('a')
  elink.style.display = 'none'
  elink.href = url
  elink.target = '_blank'
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
}
