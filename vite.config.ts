import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {

  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    base: `/${env.VITE_BASE_PATH}`,
    define: {
      'process.env': env
    },
    plugins: [react()],
  });
}
