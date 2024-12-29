import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: $t('index'), minWidth: 60 },
	// 文件的名称
	{ label: $t('files_filename'), prop: 'filename', minWidth: 280 },
	// 文件在服务器上的存储路径
	{ label: $t('files_filepath'), prop: 'filepath', minWidth: 280 },
	// 文件的MIME类型
	{ label: $t('files_fileType'), prop: 'fileType', minWidth: 180 },
	// 下载数量
	{ label: $t('files_downloadCount'), prop: 'downloadCount', minWidth: 115 },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, minWidth: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, minWidth: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', minWidth: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', minWidth: 130 },
	{ label: $t('table.operation'), fixed: 'right', minWidth: 210, slot: 'operation' },
];

// 添加规则
export const addRules = reactive({
	// 文件在服务器上的存储路径
	filepath: [{ required: true, message: `${$t('input')}${$t('files_filepath')}`, trigger: 'blur' }],
	// 文件列表
	files: [{ required: true, message: `${$t('files')}`, trigger: 'blur' }],
});

// 上传规则
export const uploadRules = reactive({
	// 文件的名称
	filename: [{ required: true, message: `${$t('input')}${$t('files_filename')}`, trigger: 'blur' }],
	// 文件的MIME类型
	fileType: [{ required: true, message: `${$t('input')}${$t('files_fileType')}`, trigger: 'blur' }],
});
