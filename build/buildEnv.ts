import { pathResolve } from './utils';
import type { BuildOptions } from 'vite';

export const buildEnvironment = () => {
	const environment: BuildOptions = {
		target: 'es2015',
		assetsInlineLimit: 20000,
		// 构建输出的目录，默认值为"dist"
		outDir: 'docker/dist',
		// 用于指定使用的代码压缩工具。在这里，minify 被设置为 'terser'，表示使用 Terser 进行代码压缩。默认值terser
		// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
		minify: 'terser',
		// 用于配置 Terser 的选项
		terserOptions: {
			// 用于配置压缩选项
			compress: {
				drop_console: true, // 是否删除代码中的 console 语句, 默认值false
				drop_debugger: true, // 是否删除代码中的 debugger 语句, 默认值false
			},
		},
		// 禁用 gzip 压缩大小报告，可略微减少打包时间
		reportCompressedSize: false,
		// 用于指定是否生成源映射文件。源映射文件可以帮助调试和定位源代码中的错误。当设置为false时，构建过程不会生成源映射文件
		sourcemap: false,
		// 用于配置 CommonJS 模块的选项
		commonjsOptions: {
			// 用于指定是否忽略 CommonJS 模块中的 try-catch 语句。当设置为false时，构建过程会保留 CommonJS 模块中的 try-catch 语句
			ignoreTryCatch: false,
		},
		// 规定触发警告的 chunk 大小, 当某个代码分块的大小超过该限制时，Vite 会发出警告
		chunkSizeWarningLimit: 2000,
		rollupOptions: {
			external: [],
			input: {
				index: pathResolve('../index.html', import.meta.url),
			},
			// 静态资源分类打包
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
				manualChunks: id => {
					// 如果是包含在包中则打包成 vendor
					if (id.includes('node_modules')) {
						return `vendor`;
					}
				},
			},
		},
	};

	return environment;
};
