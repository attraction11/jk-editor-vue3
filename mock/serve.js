const Koa = require('koa')
const router = require('koa-router')()
const koaBody = require('koa-body')()
const app = new Koa()

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

// 获取文件列表
router.post('/api/folder/getDocumentList', koaBody, async (ctx, next) => {
  ctx.response.body = {
    code: '0',
    data: {
      list: [
        {
          id: '123',
          name: 'test',
          creator: 'xxxx',
          modifier: 'xxxx',
          createTime: 1649070939428,
          modifyTime: 1649070939428,
          content: '文本内容...',
          folderId: '11111111111',
          type: 'document'
        }
      ]
    },
    msg: 'success'
  }
})

// 创建文档
router.post('/api/document/create', koaBody, async (ctx, next) => {
  ctx.response.body = {
    code: '0',
    data: {
      id: '123'
    },
    msg: 'success'
  }
})

// 保存文档
router.post('/api/document/save', koaBody, async (ctx, next) => {
  ctx.response.body = {
    code: '0',
    data: {},
    msg: 'success'
  }
})

// 上传图片(参数：id: 文档id   file: 图片文件  creator: 文件上传者)
router.post('/api/image/uploadImage', koaBody, async (ctx, next) => {
  ctx.response.body = {
    code: '0',
    data: {}, // 文件流
    msg: 'success'
  }
})

// 获取图片
router.post('/api/image/get', koaBody, async (ctx, next) => {
  ctx.response.body = {
    code: '0',
    data: {
      id: 'xxxx'
    },
    msg: 'success'
  }
})

// 获取文档内容(参数：id: 文档id)
router.post('/api/document/get', koaBody, async (ctx, next) => {
  ctx.response.body = {
    code: '0',
    msg: 'success',
    data: {
      creator: 'xxxxx',
      modifyTime: 24234234234,
      createTime: 24234234,
      modifier: 'xxxx',
      name: '文档名称',
      id: 'xxxxxxxxxxxxx',
      type: 'document',
      content: '<p style="color: red">哈哈哈哈哈哈</p>\n<p></p>',
      folderId: '11111111111'
    }
  }
})

// 导入docx文件（参数：folderId: 文件夹Id  file: 上传的Docx文件  creator: 文件上传者）
router.post('/api/document/uploadDocx', koaBody, async (ctx, next) => {
  ctx.response.body = {
    code: '0',
    data: {
      id: 'xxxx'
    },
    msg: 'success'
  }
})

// 导出docx文件（参数：id: 文档Id）
router.post('/api/document/exportDocx', koaBody, async (ctx, next) => {
  ctx.response.body = {
    code: '0',
    data: '', // 文件流
    msg: 'success'
  }
})

router.post('/api/login', koaBody, async (ctx, next) => {
  const username = ctx.request.body.username || ''
  const password = ctx.request.body.password || ''
  console.log(`signin with username: ${username}, password: ${password}`)
  if (username === 'admin' && password === '123456') {
    ctx.response.body = {
      status: true,
      data: null,
      mag: '登录成功'
    }
  } else {
    ctx.response.body = {
      status: false,
      data: null,
      mag: '用户名或密码错误'
    }
  }
})

// add router middleware:
app.use(router.routes())

app.listen(5000)
console.log('app started at port 5000...')
