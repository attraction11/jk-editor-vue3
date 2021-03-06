// extend the window
// declare interface Window {

// }

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import * as Vue from 'vue'
  // eslint-disable-next-line no-undef
  const component: JSX.Element
  export default Vue
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

declare module '*.svg' {
  const content: any
  export default content
}
