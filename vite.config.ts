import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
      }),
      Icons({
        autoInstall: true
      }), 
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css:{
      preprocessorOptions:{
        scss:{
          additionalData:'@import "@/assets/styles/mixin.scss";'
        }
      }
    },
  }
})
