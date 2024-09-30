import { h, reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { $t } from '@/plugins/i18n';
import { isAllEmpty } from '@pureadmin/utils';
import { getMenuType } from '@/views/system/menu/utils/hook';

export const columns: TableColumnList = [
	{
		label: '菜单名称',
		prop: 'title',
		align: 'left',
		cellRenderer: ({ row }) => (
			<>
				<span class='inline-block mr-1'>
					{h(useRenderIcon(row.icon), {
						style: { paddingTop: '1px' },
					})}
				</span>
				<span>{$t(row.title)}</span>
			</>
		),
	},
	{
		label: '菜单类型',
		prop: 'menuType',
		width: 100,
		cellRenderer: ({ row, props }) => (
			<el-tag size={props.size} type={getMenuType(row.menuType)} effect='plain'>
				{getMenuType(row.menuType, true)}
			</el-tag>
		),
	},
	{ label: '路由路径', prop: 'path' },
	{
		label: '组件路径',
		prop: 'component',
		formatter: ({ path, component }) => (isAllEmpty(component) ? path : component),
	},
	{ label: '权限标识', prop: 'auths' },
	{ label: '排序', prop: 'rank', width: 100 },
	{
		label: '隐藏',
		prop: 'showLink',
		formatter: ({ showLink }) => (showLink ? '否' : '是'),
		width: 100,
	},
	{ label: '操作', fixed: 'right', width: 210, slot: 'operation' },
];

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
	title: [{ required: true, message: '菜单名称为必填项', trigger: 'blur' }],
	name: [{ required: true, message: '路由名称为必填项', trigger: 'blur' }],
	path: [{ required: true, message: '路由路径为必填项', trigger: 'blur' }],
	auths: [{ required: true, message: '权限标识为必填项', trigger: 'blur' }],
});
