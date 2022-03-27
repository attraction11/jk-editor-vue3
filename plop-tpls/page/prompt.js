module.exports = {
  description: '创建页面',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入文件名',
      validate: (v) => {
        if (!v || v.trim === '') {
          return '文件名不能为空'
        } else {
          return true
        }
      },
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: `src/pages/{{dotCase name}}.vue`,
        templateFile: 'plop-tpls/page/index.hbs',
        data: {
          componentName: `${data.name}`,
        },
      },
    ]
    return actions
  },
}
