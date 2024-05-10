import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import viteBaseConfig from './vite.config.base'
import viteDevConfig from './vite.config.dev'
import viteProdConfig from './vite.config.prod'

const configResove = {
    "build":() => {
      console.log('build');  
      return ({...viteProdConfig,...viteBaseConfig})
    },
    "serve":() => {
      // console.log('serve');
      return ({...viteDevConfig,...viteBaseConfig})
    }
  }

// https://vitejs.dev/config/
export default defineConfig((env) => {
  return configResove[env.command]()
})
