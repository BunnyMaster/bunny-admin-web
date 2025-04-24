import { type DataInfo, removeToken, setToken } from './auth';
import { getQueryMap, subBefore } from '@pureadmin/utils';
import { message } from '@/utils/message';

/**
 * 简版前端单点登录，根据实际业务自行编写，平台启动后本地可以跳后面这个链接进行测试 http://localhost:8848/#/permission/page/index?username=sso&roles=admin&accessToken=eyJhbGciOiJIUzUxMiJ9.admin
 * 划重点：
 * 判断是否为单点登录，不为则直接返回不再进行任何逻辑处理，下面是单点登录后的逻辑处理
 * 1.清空本地旧信息；
 * 2.获取url中的重要参数信息，然后通过 setToken 保存在本地；
 * 3.删除不需要显示在 url 的参数
 * 4.使用 window.location.replace 跳转正确页面
 */
(function () {
  // 获取 url 中的参数
  const params = getQueryMap(location.href) as DataInfo<Date>;
  const must = ['username', 'roles', 'accessToken'];
  const mustLength = must.length;
  if (Object.keys(params).length !== mustLength) return;

  // url 参数满足 must 里的全部值，才判定为单点登录，避免非单点登录时刷新页面无限循环
  let sso = [];
  let start = 0;

  while (start < mustLength) {
    if (Object.keys(params).includes(must[start]) && sso.length <= mustLength) {
      sso.push(must[start]);
    } else {
      sso = [];
    }
    start++;
  }

  if (sso.length === mustLength) {
    // 判定为单点登录

    // 清空本地旧信息
    removeToken();

    // 保存新信息到本地
    setToken(params);

    // 删除不需要显示在 url 的参数
    delete params.roles;
    delete (params as any).accessToken;

    const newUrl = `${location.origin}${location.pathname}${subBefore(location.hash, '?')}?${JSON.stringify(params).replace(/["{}]/g, '').replace(/:/g, '=').replace(/,/g, '&')}`;

    // 替换历史记录项
    window.location.replace(newUrl);
  } else {
    return;
  }
})();

/**
 * 批量创建下载链接
 * @param blob
 * @param filename
 */
export async function download(blob: any, filename: string) {
  const result = await blobToJson(blob);
  if (result) return;

  // 创建一个临时的 URL，用于下载文件
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(new Blob([blob]));
  a.href = url;

  // 创建一个<a>元素，设置其 download 属性和 href 属性，模拟点击下载
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // 清理创建的临时元素和 URL
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

/**
 * 下载文本
 * @param text
 * @param filename
 */
export function downloadTextAsFile(text: string, filename: string) {
  // 直接创建 File 对象（比 Blob 更高级）
  const file = new File([text], filename, { type: 'text/plain' });

  // 创建下载链接
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // 触发下载
  document.body.appendChild(a);
  a.click();

  // 清理
  requestIdleCallback(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  });
}

/**
 * 下载blob文件
 * @param response
 * @param fileName
 */
export const downloadBlob = async (response: any, fileName: string) => {
  const result = await blobToJson(response);
  if (result) return;

  try {
    // 从响应头获取文件名
    const contentDisposition = response.headers['content-disposition'];
    // let fileName = 'download.zip';
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+)"/);

      if (fileNameMatch && fileNameMatch[1]) {
        fileName = fileNameMatch[1];
      }
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};

/**
 * 将 Blob 数据转换为 JSON 对象
 * @param blob Blob 数据
 * @returns 解析后的 JSON 对象
 */
async function blobToJson(blob: any): Promise<any> {
  try {
    const text = await blob.data.text();
    const json = JSON.parse(text);
    if (json.code !== 200) {
      message(json.message, { type: 'error' });
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
