import { ref } from 'vue';
import dayjs from 'dayjs';

// 前端代码提交记录
export const webCommitList = ref([]);
// 后端代码提交记录
export const serverCommitList = ref([]);

/** 获取web代码提交记录 */
export const getWebCommitList = async () => {
  const response = await fetch('http://129.211.31.58:3000/api/v1/repos/auth/auth-web/commits?page=1&limit=20');
  const json = await response.json();
  webCommitList.value = json.map((item) => ({
    date: dayjs(item?.commit?.committer?.date).format('YYYY-MM-DD HH:mm:ss'),
    url: item?.committer?.html_url,
    username: item?.committer?.username,
    avatar_url: item?.committer?.avatar_url,
    message: item?.commit?.message,
    html_url: item?.html_url,
  }));
};
/** 获取后端代码提交记录 */
export const getServerCommitList = async () => {
  const response = await fetch('http://129.211.31.58:3000/api/v1/repos/auth/auth-server-java/commits?page=1&limit=20');
  const json = await response.json();
  serverCommitList.value = json.map((item) => ({
    date: dayjs(item?.commit?.committer?.date).format('YYYY-MM-DD HH:mm:ss'),
    url: item?.committer?.html_url,
    username: item?.committer?.username,
    avatar_url: item?.committer?.avatar_url,
    message: item?.commit?.message,
    html_url: item?.html_url,
  }));
};
