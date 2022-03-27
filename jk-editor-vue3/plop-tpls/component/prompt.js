const fs = require('fs')

function getFolder(path) {
  const components = []
  const files = fs.readdirSync(path)
  files.forEach(function (item) {
    const stat = fs.lstatSync(path + '/' + item)
    if (stat.isDirectory() === true && item != 'components') {
      components.push(path + '/' + item)
      components.push.apply(components, getFolder(path + '/' + item))
    }
  })
  return components
}

module.exports = {
  description: '创建组件',
  prompts: [
    {
      type: 'confirm',
      name: 'isGlobal',
      message: '是否为全局组件',
      default: false,
    },
    {
      type: 'list',
      name: 'path',
      message: '请选择组件创建目录',
      choices: getFolder('src/components'),
      when: (answers) => {
        return !answers.isGlobal
      },
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入组件名称',
      validate: (v) => {
        if (!v || v.trim === '') {
          return '组件名称不能为空'
        } else {
          return true
        }
      },
    },
  ],
  actions: (data) => {
    let path = ''
    let install = ''
    if (data.isGlobal) {
      path = 'src/components/global/{{name}}/index.vue'
      install = 'src/components/global/{{name}}/index.ts'
    } else {
      path = `${data.path}/{{name}}.vue`
    }
    const actions = [
      {
        type: 'add',
        path: path,
        templateFile: 'plop-tpls/component/index.hbs',
      },
      {
        type: 'add',
        path: install,
        templateFile: 'plop-tpls/component/install.hbs',
      },
    ]
    return actions
  },
}
