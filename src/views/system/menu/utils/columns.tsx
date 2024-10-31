import { h, reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { ElTag } from 'element-plus';
import { $t } from '@/plugins/i18n';
import { isAllEmpty } from '@pureadmin/utils';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';

/**
 * 标签栏菜单类型匹配
 * @param type
 * @param text
 */
const getMenuType = (type: number, text: boolean = false): any => {
	switch (type) {
		case 0:
			return text ? '菜单' : 'primary';
		case 1:
			return text ? 'iframe' : 'warning';
		case 2:
			return text ? '外链' : 'danger';
	}
};

/** 格式化菜单选项 */
export const formatHigherMenuOptions = (treeList: any) => {
	if (!treeList || !treeList.length) return;
	const newTreeList = [];
	for (let i = 0; i < treeList.length; i++) {
		treeList[i].title = $t(treeList[i].title);
		formatHigherMenuOptions(treeList[i].children);
		newTreeList.push(treeList[i]);
	}
	return newTreeList;
};

export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
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
			<ElTag size={props.size} type={getMenuType(row.menuType)} effect='plain'>
				{getMenuType(row.menuType, true)}
			</ElTag>
		),
	},
	{ label: '路由路径', prop: 'path' },
	{
		label: '组件路径',
		prop: 'component',
		formatter: ({ path, component }) => (isAllEmpty(component) ? path : component),
	},
	{ label: '排序', prop: 'rank', width: 80, slot: 'rank' },
	{ label: '隐藏', prop: 'visible', slot: 'visible', width: 100 },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
	{ label: $t('table.operation'), fixed: 'right', width: 310, slot: 'operation' },
];

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
	title: [{ required: true, message: '菜单名称为必填项', trigger: 'blur' }],
	name: [{ required: true, message: '路由名称为必填项', trigger: 'blur' }],
	path: [{ required: true, message: '路由路径为必填项且为"/"开头', trigger: ['blur', 'change'], pattern: /^\/.*/ }],
	auths: [{ required: true, message: '权限标识为必填项', trigger: 'blur' }],
});
