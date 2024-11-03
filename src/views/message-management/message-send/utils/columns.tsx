import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';
import { ElTag, type FormRules } from 'element-plus';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 消息标题
	{ label: $t('title'), prop: 'title' },
	// 消息简介
	{ label: $t('summary'), prop: 'summary' },
	// 发送人昵称
	{ label: $t('sendNickname'), prop: 'sendNickname', slot: 'sendNickname' },
	// 接受人昵称
	{ label: $t('receivedUserNickname'), prop: 'receivedUserNickname' },
	// 消息类型
	{ label: $t('messageType'), prop: 'messageType', slot: 'messageType' },
	// 编辑器类型
	{ label: $t('editorType'), prop: 'editorType' },
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
	{ label: $t('extra'), prop: 'extra', slot: 'extra' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
	{ label: $t('table.operation'), fixed: 'right', width: 150, slot: 'operation' },
];

// 添加规则
export const rules = reactive<FormRules>({
	// 消息标题
	title: [{ required: true, message: `${$t('input')}${$t('title')}`, trigger: 'blur' }],
	// 发送人用户ID
	sendUserId: [{ required: true, message: `${$t('input')}${$t('sendUserId')}`, trigger: 'blur' }],
	// 消息类型
	messageTypeId: [{ required: true, message: `${$t('input')}${$t('messageType')}`, trigger: 'blur' }],
	// 消息内容
	content: [{ required: true, message: `${$t('input')}${$t('content')}`, trigger: 'blur' }],
	// 编辑器类型
	editorType: [{ required: true, message: `${$t('input')}${$t('editorType')}`, trigger: 'blur' }],
});

/** 编辑器类型 */
export const editorTypeList = [
	{ label: $t('markdown'), value: 'markdown' },
	{ label: $t('richText'), value: 'rich' },
];
