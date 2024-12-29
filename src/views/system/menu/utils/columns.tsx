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
			return text ? $t('menu') : 'primary';
		case 1:
			return text ? 'iframe' : 'warning';
		case 2:
			return text ? $t('externalLink') : 'danger';
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
		label: $t('menuName'),
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
		minWidth: 170,
	},
	{
		label: $t('menuType'),
		prop: 'menuType',
		minWidth: 130,
		cellRenderer: ({ row, props }) => (
			<ElTag size={props.size} type={getMenuType(row.menuType)} effect='plain'>
				{getMenuType(row.menuType, true)}
			</ElTag>
		),
	},
	{ label: $t('routerPath'), prop: 'path', minWidth: 230 },
	{
		label: $t('componentPath'),
		prop: 'component',
		formatter: ({ path, component }) => (isAllEmpty(component) ? path : component),
		minWidth: 200,
	},
	{ label: $t('sort'), prop: 'rank', minWidth: 80, slot: 'rank' },
	{ label: $t('visible'), prop: 'visible', slot: 'visible', minWidth: 100 },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, minWidth: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, minWidth: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', minWidth: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', minWidth: 130 },
	{ label: $t('table.operation'), fixed: 'right', minWidth: 310, slot: 'operation' },
];

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
	title: [{ required: true, message: $t('menuNameTip'), trigger: 'blur' }],
	name: [{ required: true, message: $t('routerNameTip'), trigger: 'blur' }],
	path: [{ required: true, message: $t('routerPathTip'), trigger: ['blur', 'change'], pattern: /^\/.*/ }],
});
