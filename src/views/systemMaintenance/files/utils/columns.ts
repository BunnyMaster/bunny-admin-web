import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 文件的名称
	{ label: $t('files_filename'), prop: 'filename', width: 400 },
	// 文件在服务器上的存储路径
	{ label: $t('files_filepath'), prop: 'filepath' },
	// 文件的MIME类型
	{ label: $t('files_fileType'), prop: 'fileType', width: 100 },
	// 下载数量
	{ label: $t('files_downloadCount'), prop: 'downloadCount', width: 90 },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
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
