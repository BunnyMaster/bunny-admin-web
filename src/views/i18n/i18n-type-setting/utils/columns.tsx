import { ref } from 'vue';
import { delObjectProperty } from '@pureadmin/utils';
import { isDefaultOptions } from '@/enums/baseConstant';
import TableIsDefaultTag from '@/components/TableBar/src/TableIsDefaultTag.vue';
import { userI18nTypeStore } from '@/store/i18n/i18nType';

const i18nTypeStore = userI18nTypeStore();
export const editMap = ref({});

export const columns: TableColumnList = [
	// { type: 'index', label: '序号', width: 100 },
	{
		label: 'i18n.languageName',
		prop: 'languageName',
		cellRenderer({ row, index }) {
			return <>{editMap.value[index]?.editable ? <el-input v-model={row.languageName} /> : <p>{row.languageName}</p>}</>;
		},
	},
	{
		label: 'i18n.languageSummary',
		prop: 'summary',
		cellRenderer({ row, index }) {
			return <>{editMap.value[index]?.editable ? <el-input v-model={row.summary} /> : <p>{row.summary}</p>}</>;
		},
	},
	{
		label: 'i18n.isDefault',
		prop: 'isDefault',
		cellRenderer({ row, index }) {
			return (
				<>
					{editMap.value[index]?.editable ? (
						<el-select placeholder={'table.chooseIsDefault'} v-model={row.isDefault}>
							{isDefaultOptions.map(item => (
								<el-option key={item.value} label={item.label} value={item.value} />
							))}
						</el-select>
					) : (
						<TableIsDefaultTag status={row.isDefault} />
					)}
				</>
			);
		},
	},
	// ? 表格操作
	{ label: 'table.operation', prop: 'op', slot: 'op', width: 160, fixed: 'right' },
];

/**
 * * 编辑内容
 * @param row
 * @param index
 */
export function onEdit(row: any, index: number) {
	editMap.value[index] = Object.assign({ ...row, editable: true });
}

/**
 * * 保存修改
 * @param row
 * @param index
 */
export async function onSave(row: any, index: number) {
	await i18nTypeStore.updateI18nType(row);
	editMap.value[index].editable = false;
	await i18nTypeStore.getI18nTypeList();
}

/**
 * * 返回，不修改
 * @param index
 */
export function onCancel(index: number) {
	editMap.value[index].editable = false;
	i18nTypeStore.datalist[index] = delObjectProperty(editMap.value[index], 'editable');
}
