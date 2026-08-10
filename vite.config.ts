import { fileURLToPath } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

function injectLibraryStyles(): Plugin {
  return {
    name: "inject-library-styles",
    enforce: "post",
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type === "chunk" && output.isEntry) {
          output.code = `import "./styles.css";\n${output.code}`
        }
      }
    },
  }
}

export default defineConfig({
  optimizeDeps: {
    include: [
      "@base-ui/react/context-menu",
      "@base-ui/react/preview-card",
      "@base-ui/react/radio",
      "@base-ui/react/radio-group",
      "@base-ui/react/toast",
    ],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [react(), tailwindcss(), injectLibraryStyles()],
  build: {
    lib: {
      entry: "src/entry.ts",
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    rollupOptions: {
      external: (id) =>
        id === "react" ||
        id.startsWith("react/") ||
        id === "react-dom" ||
        id.startsWith("react-dom/") ||
        id === "@base-ui/react" ||
        id.startsWith("@base-ui/react/") ||
        id === "class-variance-authority" ||
        id === "clsx" ||
        id === "date-fns" ||
        id.startsWith("date-fns/") ||
        id === "lucide-react" ||
        id === "react-day-picker" ||
        id.startsWith("react-day-picker/") ||
        id === "tailwind-merge",
    },
  },
})
