
import { defineConfig } from "vite";
import cdn from "vite-plugin-cdn2";
// 合并有问题。。。
export default defineConfig({
    plugins:[
        cdn({
            modules:['vue']
        })
    ]
})