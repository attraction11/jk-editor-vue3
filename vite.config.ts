import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import Vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
// import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue(),
    Components({
      dts: true, // 启用ts支持
      resolvers: [
        // https://github.com/antfu/unplugin-vue-components
        AntDesignVueResolver() // 配置 ant design vue 按需加载支持
      ]
    }),
    // cjs2esmVitePlugin(),
    // https://github.com/vbenjs/vite-plugin-vue-setup-extend
    VueSetupExtend(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
      extensions: ['vue', 'md']
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDirs: 'src/layouts'
    }),
    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: markdownWrapperClasses
    })
    // createStyleImportPlugin({
    //   resolves: [AndDesignVueResolve()],
    //   libs: [
    //     // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
    //     {
    //       libraryName: 'ant-design-vue',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `ant-design-vue/es/${name}/style/index`
    //       }
    //     }
    //   ]
    // })
  ],
  server: {
    open: true,
    fs: {
      strict: true
    },
    proxy: {
      // 选项写法
      '/api': {
        target: 'https://shop.fed.lagou.com/api/admin', // 代理的目标地址
        // 兼容基于名字的虚拟主机
        // a.com ==>(通过域名映射主机本地端口) locahost:2xxx
        // b.com ==>(通过域名映射主机本地端口) locahost:3xxx
        // HTTP 请求头部的 origin 字段(默认真实 origin: localhost:3000)
        // 设置 changeOrigin: true 后代理服务会把 origin 字段修改为代理的目标地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#1DA57A',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  }
})
