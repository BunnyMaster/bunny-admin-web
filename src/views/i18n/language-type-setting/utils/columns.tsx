import { ref } from 'vue';
import { delObjectProperty } from '@pureadmin/utils';
import { $t } from '@/plugins/i18n';
import { useI18nTypeStore } from '@/store/i18n/i18nType';
import { isDefaultOptions } from '@/enums/baseConstant';
import TableIsDefaultTag from '@/components/Table/TableIsDefaultTag.vue';

const i18nTypeStore = useI18nTypeStore();
export const editMap = ref({});

export const columns: TableColumnList = [
	{ type: 'index', label: '序号', width: 100 },
	{
		label: $t('i18n.languageName'),
		prop: 'languageName',
		cellRenderer({ row, index }) {
			return <>{editMap.value[index]?.editable ? <el-input v-model={row.languageName} /> : <p>{row.languageName}</p>}</>;
		},
	},
	{
		label: $t('i18n.languageSummary'),
		prop: 'summary',
		cellRenderer({ row, index }) {
			return <>{editMap.value[index]?.editable ? <el-input v-model={row.summary} /> : <p>{row.summary}</p>}</>;
		},
	},
	{
		label: $t('i18n.isDefault'),
		prop: 'isDefault',
		cellRenderer({ row, index }) {
			return (
				<>
					{editMap.value[index]?.editable ? (
						<el-select placeholder={$t('table.chooseIsDefault')} v-model={row.isDefault}>
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
	{ label: $t('table.operation'), prop: 'op', slot: 'op', width: 160, fixed: 'right' },
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
	await i18nTypeStore.updateLanguageType(row);
	editMap.value[index].editable = false;
	await i18nTypeStore.getLanguageType();
}

/**
 * * 返回，不修改
 * @param index
 */
export function onCancel(index: number) {
	editMap.value[index].editable = false;
	i18nTypeStore.dataList[index] = delObjectProperty(editMap.value[index], 'editable');
}
