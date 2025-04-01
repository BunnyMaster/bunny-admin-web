import { loadEnv, type ServerOptions } from 'vite';
import { root, wrapperEnv } from './utils';

export const serverOptions = (mode: string) => {
	const { VITE_PORT, VITE_APP_URL } = wrapperEnv(loadEnv(mode, root));

	const options: ServerOptions = {
		port: VITE_PORT, // ? 端口号
		host: '0.0.0.0',
		open: true,
		cors: true,
		proxy: {
			'/api/v1/': {
				target: 'http://129.211.31.58:3000',
				changeOrigin: true,
			},
			'/api': {
				target: VITE_APP_URL,
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/api/, '/api'),
			},
			'/mock': {
				target: VITE_APP_URL,
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/mock/, '/mock'),
			},
		},
		// 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
		warmup: {
			clientFiles: ['./index.html', './src/{views,components}/*'],
		},
	};

	return options;
};
