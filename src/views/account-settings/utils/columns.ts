import dayjs from 'dayjs';
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';

export const columns: TableColumnList = [
	{
		label: '详情',
		prop: 'summary',
		minWidth: 140,
	},
	{
		label: 'IP 地址',
		prop: 'ip',
		minWidth: 100,
	},
	{
		label: '地点',
		prop: 'address',
		minWidth: 140,
	},
	{
		label: '操作系统',
		prop: 'system',
		minWidth: 100,
	},
	{
		label: '浏览器类型',
		prop: 'browser',
		minWidth: 100,
	},
	{
		label: '时间',
		prop: 'operatingTime',
		minWidth: 180,
		formatter: ({ operatingTime }) => dayjs(operatingTime).format('YYYY-MM-DD HH:mm:ss'),
	},
];

export const rules = reactive<FormRules<any>>({
	nickname: [{ required: true, message: '昵称必填', trigger: 'blur' }],
});
