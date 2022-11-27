// vite.config.ts
import solid from "file:///C:/Users/%D7%90%D7%95%D7%A8/Desktop/Projects/todos/node_modules/solid-start/vite/plugin.js";
import dotenv from "file:///C:/Users/%D7%90%D7%95%D7%A8/Desktop/Projects/todos/node_modules/dotenv/lib/main.js";
import UnoCSS from "file:///C:/Users/%D7%90%D7%95%D7%A8/Desktop/Projects/todos/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///C:/Users/%D7%90%D7%95%D7%A8/Desktop/Projects/todos/node_modules/vite/dist/node/index.js";
import vercel from "file:///C:/Users/%D7%90%D7%95%D7%A8/Desktop/Projects/todos/node_modules/solid-start-vercel/index.js";
var vite_config_default = defineConfig(() => {
  dotenv.config();
  return {
    plugins: [
      solid({ ssr: false, adapter: vercel({ edge: false }) }),
      UnoCSS()
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTA1RDBcdTA1RDVcdTA1RThcXFxcRGVza3RvcFxcXFxQcm9qZWN0c1xcXFx0b2Rvc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHUwNUQwXHUwNUQ1XHUwNUU4XFxcXERlc2t0b3BcXFxcUHJvamVjdHNcXFxcdG9kb3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVENyU5MCVENyU5NSVENyVBOC9EZXNrdG9wL1Byb2plY3RzL3RvZG9zL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHNvbGlkIGZyb20gXCJzb2xpZC1zdGFydC92aXRlXCI7XG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcbmltcG9ydCBVbm9DU1MgZnJvbSBcInVub2Nzcy92aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuLy8gQHRzLWV4cGVjdC1lcnJvciBubyB0eXBpbmdcbmltcG9ydCB2ZXJjZWwgZnJvbSBcInNvbGlkLXN0YXJ0LXZlcmNlbFwiO1xuICBcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiB7XG4gIGRvdGVudi5jb25maWcoKTtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgc29saWQoeyBzc3I6IGZhbHNlLCBhZGFwdGVyOiB2ZXJjZWwoeyBlZGdlOiBmYWxzZSB9KSB9KSxcbiAgICAgICAgICBVbm9DU1MoKSxcbiAgICAgICAgXSxcbiAgfTtcbn0pO1xuICAiXSwKICAibWFwcGluZ3MiOiAiO0FBQXNULE9BQU8sV0FBVztBQUN4VSxPQUFPLFlBQVk7QUFDbkIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsb0JBQW9CO0FBRTdCLE9BQU8sWUFBWTtBQUVuQixJQUFPLHNCQUFRLGFBQWEsTUFBTTtBQUNoQyxTQUFPLE9BQU87QUFDZCxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDSCxNQUFNLEVBQUUsS0FBSyxPQUFPLFNBQVMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUFBLE1BQ3RELE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDTjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
