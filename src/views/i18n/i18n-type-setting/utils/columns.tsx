import { reactive, ref } from 'vue';

export const editMap = ref({});

export const columns: TableColumnList = [
	{ label: 'id', prop: 'id' },
	{ label: 'i18n_languageName', prop: 'typeName' },
	{ label: 'i18n_summary', prop: 'summary' },
	{ label: 'isDefault', prop: 'isDefault', slot: 'isDefault' },
	{ label: 'updateTime', prop: 'updateTime' },
	{ label: 'createTime', prop: 'createTime' },
	{ label: 'createUser', prop: 'createUser' },
	{ label: 'updateUser', prop: 'updateUser' },
	{ label: 'operation', fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	typeName: [{ required: true, message: '填写语言名称(例如：zh)', trigger: 'blur' }],
	summary: [{ required: true, message: '填写语言详情', trigger: 'blur' }],
});
