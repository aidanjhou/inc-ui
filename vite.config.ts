import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo'

  return {
    plugins: [
      react(),
      ...(!isDemo
        ? [
            dts({
              tsconfigPath: './tsconfig.app.json',
              bundleTypes: false,
              insertTypesEntry: true,
              include: ['src/components/**/*', 'src/lib/**/*', 'src/index.ts'],
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'src': path.resolve(__dirname, './src'),
      },
    },
    build: isDemo
      ? {
          outDir: 'dist-demo',
        }
      : {
          outDir: 'dist',
          lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'IncUI',
            formats: ['es', 'umd'],
            fileName: (format) => `inc-ui.${format}.js`,
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'tailwindcss'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                tailwindcss: 'tailwindcss',
              },
            },
          },
        },
  }
})
