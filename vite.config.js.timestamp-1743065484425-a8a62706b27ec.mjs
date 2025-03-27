// vite.config.js
import { defineConfig } from "file:///C:/Users/Martin/Projekte/Privat/meingirokonto/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "url";
import { dirname, resolve } from "path";
import vue from "file:///C:/Users/Martin/Projekte/Privat/meingirokonto/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vuetify from "file:///C:/Users/Martin/Projekte/Privat/meingirokonto/node_modules/vite-plugin-vuetify/dist/index.mjs";
import VueI18nPlugin from "file:///C:/Users/Martin/Projekte/Privat/meingirokonto/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import { viteStaticCopy } from "file:///C:/Users/Martin/Projekte/Privat/meingirokonto/node_modules/vite-plugin-static-copy/dist/index.js";
import zipPack from "file:///C:/Users/Martin/Projekte/Privat/meingirokonto/node_modules/vite-plugin-zip-pack/dist/esm/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Martin/Projekte/Privat/meingirokonto/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vuetify(),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: resolve(dirname(fileURLToPath(__vite_injected_original_import_meta_url)), "./src/locales/**")
    }),
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: "../meingirokonto@gmx.de/",
          overwrite: true
        },
        {
          src: "../meingirokonto@gmx.de",
          dest: "C:/Users/Martin/AppData/Roaming/Mozilla/Firefox/Profiles/developer.mb/extensions/",
          overwrite: true
        }
      ]
    }),
    zipPack({
      inDir: "./meingirokonto@gmx.de",
      outDir: "C:/Users/Martin/Projekte/Privat/meingirokonto/releases/firefox",
      outFileName: "meingirokonto@gmx.de.xpi"
    })
  ],
  root: "./src",
  base: "./",
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    ]
  },
  build: {
    minify: false,
    cssMinify: false,
    target: ["es2022", "firefox132"],
    assetsDir: "assets",
    assetsInlineLimit: 0,
    emptyOutDir: false,
    outDir: "../meingirokonto@gmx.de",
    modulePreload: false,
    rollupOptions: {
      input: {
        background: "src/background.js",
        app: "src/app.html"
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "assets/[name].[ext]",
        format: "es"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNYXJ0aW5cXFxcUHJvamVrdGVcXFxcUHJpdmF0XFxcXG1laW5naXJva29udG9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1hcnRpblxcXFxQcm9qZWt0ZVxcXFxQcml2YXRcXFxcbWVpbmdpcm9rb250b1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTWFydGluL1Byb2pla3RlL1ByaXZhdC9tZWluZ2lyb2tvbnRvL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXG5pbXBvcnQge2ZpbGVVUkxUb1BhdGgsIFVSTH0gZnJvbSAndXJsJ1xuaW1wb3J0IHtkaXJuYW1lLCByZXNvbHZlfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xuaW1wb3J0IFZ1ZUkxOG5QbHVnaW4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSdcbmltcG9ydCB7dml0ZVN0YXRpY0NvcHl9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5J1xuaW1wb3J0IHppcFBhY2sgZnJvbSAndml0ZS1wbHVnaW4temlwLXBhY2snXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVldGlmeSgpLFxuICAgIFZ1ZUkxOG5QbHVnaW4oe1xuICAgICAgcnVudGltZU9ubHk6IHRydWUsXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXG4gICAgICBpbmNsdWRlOiByZXNvbHZlKGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKSwgJy4vc3JjL2xvY2FsZXMvKionKVxuICAgIH0pLFxuICAgIHZpdGVTdGF0aWNDb3B5KHtcbiAgICAgIHRhcmdldHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogJ21hbmlmZXN0Lmpzb24nLFxuICAgICAgICAgIGRlc3Q6ICcuLi9tZWluZ2lyb2tvbnRvQGdteC5kZS8nLFxuICAgICAgICAgIG92ZXJ3cml0ZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnLi4vbWVpbmdpcm9rb250b0BnbXguZGUnLFxuICAgICAgICAgIGRlc3Q6ICdDOi9Vc2Vycy9NYXJ0aW4vQXBwRGF0YS9Sb2FtaW5nL01vemlsbGEvRmlyZWZveC9Qcm9maWxlcy9kZXZlbG9wZXIubWIvZXh0ZW5zaW9ucy8nLFxuICAgICAgICAgIG92ZXJ3cml0ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSksXG4gICAgemlwUGFjayh7XG4gICAgICBpbkRpcjogJy4vbWVpbmdpcm9rb250b0BnbXguZGUnLFxuICAgICAgb3V0RGlyOiAnQzovVXNlcnMvTWFydGluL1Byb2pla3RlL1ByaXZhdC9tZWluZ2lyb2tvbnRvL3JlbGVhc2VzL2ZpcmVmb3gnLFxuICAgICAgb3V0RmlsZU5hbWU6ICdtZWluZ2lyb2tvbnRvQGdteC5kZS54cGknXG4gICAgfSlcbiAgXSxcbiAgcm9vdDogJy4vc3JjJyxcbiAgYmFzZTogJy4vJyxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIGNzc01pbmlmeTogZmFsc2UsXG4gICAgdGFyZ2V0OiBbJ2VzMjAyMicsICdmaXJlZm94MTMyJ10sXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogMCxcbiAgICBlbXB0eU91dERpcjogZmFsc2UsXG4gICAgb3V0RGlyOiAnLi4vbWVpbmdpcm9rb250b0BnbXguZGUnLFxuICAgIG1vZHVsZVByZWxvYWQ6IGZhbHNlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGJhY2tncm91bmQ6ICdzcmMvYmFja2dyb3VuZC5qcycsXG4gICAgICAgIGFwcDogJ3NyYy9hcHAuaHRtbCdcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0uanMnLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ1tuYW1lXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS5bZXh0XScsXG4gICAgICAgIGZvcm1hdDogJ2VzJ1xuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUSxvQkFBbUI7QUFDaFcsU0FBUSxlQUFlLFdBQVU7QUFDakMsU0FBUSxTQUFTLGVBQWM7QUFDL0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUNwQixPQUFPLG1CQUFtQjtBQUMxQixTQUFRLHNCQUFxQjtBQUM3QixPQUFPLGFBQWE7QUFQeUwsSUFBTSwyQ0FBMkM7QUFVOVAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsU0FBUyxRQUFRLFFBQVEsY0FBYyx3Q0FBZSxDQUFDLEdBQUcsa0JBQWtCO0FBQUEsSUFDOUUsQ0FBQztBQUFBLElBQ0QsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFVBQ04sV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDOUQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsUUFBUSxDQUFDLFVBQVUsWUFBWTtBQUFBLElBQy9CLFdBQVc7QUFBQSxJQUNYLG1CQUFtQjtBQUFBLElBQ25CLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxRQUNaLEtBQUs7QUFBQSxNQUNQO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
