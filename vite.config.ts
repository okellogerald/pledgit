import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {},
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  resolve: {
    alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
},
});
