import boxen, { type Options as BoxenOptions } from 'boxen';
import dayjs, { type Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import gradient from 'gradient-string';
import type { Plugin } from 'vite';
import { getPackageSize } from './utils';
dayjs.extend(duration);

const welcomeMessage = (VITE_PORT: number) =>
  gradient(['cyan', 'magenta']).multiline(
    `您好! 欢迎使用 bunny 系列开发模板项目访问地址如下：\nhttp://localhost:${VITE_PORT}
pure-admin 开源项目保姆级文档：\nhttps://pure-admin.cn`
  );

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: 'cyan',
  borderStyle: 'round',
};

export function viteBuildInfo(VITE_PORT: number): Plugin {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  let outDir: string;
  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = resolvedConfig.build?.outDir ?? 'dist';
    },
    buildStart() {
      console.log(boxen(welcomeMessage(VITE_PORT), boxenOptions));
      if (config.command === 'build') {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = dayjs(new Date());
        getPackageSize({
          folder: outDir,
          callback: (size: string) => {
            console.log(
              boxen(
                gradient(['cyan', 'magenta']).multiline(
                  `🎉 恭喜打包完成（总用时${dayjs.duration(endTime.diff(startTime)).format('mm分ss秒')}，打包后的大小为${size}）`
                ),
                boxenOptions
              )
            );
          },
        });
      }
    },
  };
}
