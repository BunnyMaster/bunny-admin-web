import { $t } from '@/plugins/i18n';
import { ElTag, ElText } from 'element-plus';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 消息标题
	{ label: $t('title'), prop: 'title' },
	// 消息简介
	{ label: $t('summary'), prop: 'summary' },
	// 发送人昵称
	{ label: $t('sendNickname'), prop: 'sendNickname', slot: 'sendNickname', width: 130 },
	// 接受人昵称
	{ label: $t('receivedUserNickname'), prop: 'receivedUserNickname', slot: 'receivedUserNickname', width: 130 },
	// 消息类型
	{ label: $t('messageType'), prop: 'messageType', slot: 'messageType', width: 130 },
	// 编辑器类型
	{
		label: $t('editorType'),
		prop: 'editorType',
		width: 130,
		formatter({ editorType }) {
			return editorType === 'rich' ? <ElText type={'info'}>{editorType}</ElText> : <ElText type={'warning'}>{editorType}</ElText>;
		},
	},
	// 封面
	{ label: $t('cover'), prop: 'cover', slot: 'cover', width: 80 },
	// 消息等级
	{
		label: $t('level'),
		prop: 'level',
		formatter({ level }) {
			return (
				<ElTag type={level} effect={'plain'} round>
					{$t(level)}
				</ElTag>
			);
		},
		width: 100,
	},
	// 消息等级详情
	{ label: $t('extra'), prop: 'extra', slot: 'extra', width: 130 },
	// 0:未读 1:已读
	{
		label: $t('status'),
		prop: 'status',
		formatter({ status }) {
			return status ? (
				<ElTag type={'info'} effect={'plain'}>
					{$t('readAlready')}
				</ElTag>
			) : (
				<ElTag type={'danger'} effect={'plain'}>
					{$t('unread')}
				</ElTag>
			);
		},
		width: 80,
	},
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
];
