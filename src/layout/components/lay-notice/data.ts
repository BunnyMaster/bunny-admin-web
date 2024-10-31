import { $t } from '@/plugins/i18n';
import { ref } from 'vue';
import { fetchGetMessageList } from '@/api/v1/message';

export interface ListItem {
	cover: string;
	title: string;
	datetime: string;
	type: string;
	description: string;
	status?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
	extra?: string;
}

export interface TabItem {
	key: string;
	name: string;
	list: ListItem[];
	emptyText: string;
}

// 请求参数
const form = { status: false, currentPage: 1, pageSize: 100 };
// 响应内容
export const noticesData = ref<TabItem[]>([]);

/** 获取所有消息 */
export const getAllMessageList = async () => {
	const baseResult = await fetchGetMessageList(form);
	const datalist = baseResult.data.list;

	// 通知消息
	const notifications = datalist
		.filter(message => message.messageType === 'notifications')
		.map(message => ({
			cover: message.cover,
			title: message.title,
			datetime: message.createTime,
			description: message.summary,
			type: '1',
			status: message.statusType,
			extra: message.extra,
		})) as ListItem[];

	// 消息
	const notify = datalist
		.filter(message => message.messageType !== 'notifications' && message.messageType !== 'sys')
		.map(message => ({
			cover: message.cover,
			description: message.summary,
			title: message.title,
			datetime: message.createTime,
			type: '2',
			status: message.statusType,
			extra: message.extra,
		})) as ListItem[];

	// 系统消息
	const system = datalist
		.filter(message => message.messageType === 'sys')
		.map(message => ({
			cover: message.cover,
			description: message.summary,
			title: message.title,
			datetime: message.createTime,
			type: '3',
			status: message.statusType,
			extra: message.extra,
		})) as ListItem[];

	noticesData.value = [
		{ key: '1', name: $t('status.pureNotify'), list: notifications, emptyText: $t('status.pureNoNotify') },
		{ key: '2', name: $t('status.pureMessage'), list: notify, emptyText: $t('status.pureNoMessage') },
		{ key: '3', name: $t('status.systemMessage'), list: system, emptyText: $t('status.systemMessage') },
	];
};
