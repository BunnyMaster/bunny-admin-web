import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';
import type { FormRules } from 'element-plus';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 消息标题
	{ label: $t('title'), prop: 'title' },
	// 接收人用户ID
	{
		label: $t('receivedUserIds'),
		prop: 'receivedUserIds',
		formatter({ receivedUserIds }) {
			return !receivedUserIds ? $t('all') : $t('portion');
		},
	},
	// 发送人昵称
	{ label: $t('sendNickname'), prop: 'sendNickname' },
	// 消息类型
	{ label: $t('messageType'), prop: 'messageType' },
	// 消息内容
	{ label: $t('content'), prop: 'content' },
	// 编辑器类型
	{ label: $t('editorType'), prop: 'editorType' },
	// 0:未读 1:已读
	{
		label: $t('status'),
		prop: 'status',
		formatter({ status }) {
			return status ? $t('readAlready') : $t('unread');
		},
	},
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive<FormRules>({
	// 消息标题
	title: [{ required: true, message: `${$t('input')}${$t('title')}`, trigger: 'blur' }],
	// 发送人用户ID
	sendUserId: [{ required: true, message: `${$t('input')}${$t('sendUserId')}`, trigger: 'blur' }],
	// 消息类型
	messageType: [{ required: true, message: `${$t('input')}${$t('messageType')}`, trigger: 'blur' }],
	// 消息内容
	content: [{ required: true, message: `${$t('input')}${$t('content')}`, trigger: 'blur' }],
	// 编辑器类型
	editorType: [{ required: true, message: `${$t('input')}${$t('editorType')}`, trigger: 'blur' }],
});

/** 编辑器类型 */
export const editorTypeList = [
	{ label: $t('markdown'), value: 'markdown' },
	{ label: $t('richText'), value: 'richText' },
];
