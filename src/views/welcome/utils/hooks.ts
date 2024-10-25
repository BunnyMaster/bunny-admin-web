import { ref } from 'vue';
import dayjs from 'dayjs';

// 前端代码提交记录
export const webCommitList = ref([]);
// 后端代码提交记录
export const serverCommitList = ref([]);

/** 获取web代码提交记录 */
export const getWebCommitList = async () => {
	const response = await fetch('https://gitee.com/api/v5/repos/BunnyBoss/bunny-admin-web/commits?access_token=1dc76ba34226aea3eca52c1121c51617&page=1&per_page=20');
	const json = await response.json();
	webCommitList.value = json.map(item => ({
		date: dayjs(item?.commit?.committer?.date).format('YYYY-MM-DD HH:mm:ss'),
		url: item?.committer?.html_url,
		name: item?.committer?.name,
		avatar_url: item?.committer?.avatar_url,
		message: item?.commit?.message,
		html_url: item?.html_url,
	}));
};
/** 获取后端代码提交记录 */
export const getServerCommitList = async () => {
	const response = await fetch('https://gitee.com/api/v5/repos/BunnyBoss/bunny-admin-server/commits?access_token=1dc76ba34226aea3eca52c1121c51617&page=1&per_page=20');
	const json = await response.json();
	serverCommitList.value = json.map(item => ({
		date: dayjs(item?.commit?.committer?.date).format('YYYY-MM-DD HH:mm:ss'),
		url: item?.committer?.html_url,
		name: item?.committer?.name,
		avatar_url: item?.committer?.avatar_url,
		message: item?.commit?.message,
		html_url: item?.html_url,
	}));
};
