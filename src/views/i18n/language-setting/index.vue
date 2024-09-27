<script lang="ts" setup>
import TablePlusBar from '@/components/TableBar/src/TablePlusBar.vue';
import { DeleteFilled, Plus } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { columns } from '@/views/i18n/language-setting/utils/columns';
import { userI18nSettingStore } from '@/store/i18n/i18nSetting';
import { useI18nTypeStore } from '@/store/i18n/i18nType';
import LanguageAdd from '@/views/i18n/language-setting/language-add.vue';
import LanguageUpdate from '@/views/i18n/language-setting/language-update.vue';
import { I18nSettingsRow, I18nSettingsUpdateForm } from '@/types/store/system/i18n/i18n-setting';
import { messageBox } from '@/utils/message';

const i18nSettingStore = userI18nSettingStore();
const i18nTypeStore = useI18nTypeStore();
const column = ref(columns);
// 更新表单数据
const updateForm = reactive<I18nSettingsUpdateForm>({
	id: '',
	languageId: '',
	keyName: '',
	translate: '',
	parentId: '',
});
// 彻底删除 id列表
const ids = ref<string[]>([]);

/**
 * * 查询内容
 */
const getI18nDataList = async () => {
	i18nSettingStore.loading = true;
	await i18nSettingStore.getQueryI18nPage();
	i18nSettingStore.loading = false;
};

/**
 * * 当前页改变时
 */
const onCurrentPageChange = async (value: number) => {
	i18nSettingStore.pagination.currentPage = value;
	await getI18nDataList();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = (value: number) => {
	i18nSettingStore.pagination.pageSize = value;
	getI18nDataList();
};

/**
 * * 选择框点击的行
 * @param row
 */
const onSelectionChange = (row: I18nSettingsRow[]) => {
	ids.value = row.map(item => item.id);
};

/**
 * * 行内容添加
 * 打开添加弹窗
 */
const onRowAdd = () => {
	i18nSettingStore.addDialogVisible = true;
};

/**
 * * 批量彻底删除行
 */
const onRowDelete = async () => {
	const isConfirm = await messageBox({
		message: '是否确认批量删除(此操作不可逆)',
		title: '删除警告',
		showMessage: false,
		confirmMessage: '删除成功',
		cancelMessage: '取消删除',
	});

	if (isConfirm) {
		const data = ids.value;
		await i18nSettingStore.deleteI18nByIds(data);
		await getI18nDataList();
	}
};
/**
 * * 批量彻底删除行
 */
const onRowDeleteWithChildren = async () => {
	const isConfirm = await messageBox({
		message: '是否确认批量删除(此操作不可逆)',
		title: '删除警告',
		showMessage: false,
		confirmMessage: '删除成功',
		cancelMessage: '取消删除',
	});

	if (isConfirm) {
		const data = ids.value;
		await i18nSettingStore.deleteI18nByIdsWithChildren(data);
		await getI18nDataList();
	}
};

/**
 * * 当表格修改时
 */
const onUpdate = (row: any) => {
	const data = row.row;
	// 根据语言key找到语言id
	const languageTypeMap = i18nTypeStore.languageTypeMap.filter(item => item.key == data.languageName);
	// 赋值内容
	updateForm.id = data.id;
	updateForm.languageId = data.parentKeyName;
	updateForm.keyName = data.keyName;
	updateForm.translate = data.translate;
	data.parentId != 0 && (updateForm.parentId = data.parentId);
	updateForm.languageId = languageTypeMap[0].id;

	// 打开弹窗
	i18nSettingStore.updateDialogVisible = true;
};

/**
 * * 当删除时
 * @param row
 */
const onDelete = async (row: any) => {
	const id = row.row.id;
	const form = { id };
	await i18nSettingStore.deleteI18n(form);
	await i18nSettingStore.getQueryI18nPage();
};

onMounted(() => {
	getI18nDataList();
});
</script>

<template>
	<div class="flex justify-between">
		<language-add v-if="i18nSettingStore.addDialogVisible" />
		<language-update v-if="i18nSettingStore.updateDialogVisible" :form="updateForm" />
		<TablePlusBar
			:column="column"
			:data-list="i18nSettingStore.dataList"
			:handle-current-change="onCurrentPageChange"
			:handle-selection-change="onSelectionChange"
			:handle-size-change="onPageSizeChange"
			:loading="i18nSettingStore.loading"
			:model="i18nSettingStore.form"
			:on-re-fresh="getI18nDataList"
			:on-search="getI18nDataList"
			:pagination="i18nSettingStore.pagination"
			:table-delete="onDelete"
			:table-edit="onUpdate"
			class="flex-1"
			@change-column="args => (column = args)"
		>
			<template #tableForm>
				<el-form-item label="多语言key" prop="keyName">
					<el-input v-model="i18nSettingStore.form.keyName" class="!w-[150px]" clearable placeholder="输入多语言key" />
				</el-form-item>
				<el-form-item label="翻译" prop="translate">
					<el-input v-model="i18nSettingStore.form.translate" class="!w-[150px]" clearable placeholder="输入多语言翻译" />
				</el-form-item>
				<el-form-item label="语言名称" prop="languageName" style="width: 240px">
					<el-select v-model="i18nSettingStore.form.languageName" filterable placeholder="选择语言名称">
						<el-option v-for="item in i18nTypeStore.languageTypeMap" :key="item.id" :label="item.value" :value="item.key" />
					</el-select>
				</el-form-item>
			</template>

			<template #tableButtons>
				<el-button :icon="Plus" type="primary" @click="onRowAdd">{{ $t('buttons.add') }}</el-button>
				<el-button v-show="ids.length > 0" :icon="DeleteFilled" type="danger" @click="onRowDelete">
					{{ $t('buttons.deleteBatches') }}
				</el-button>
				<el-button v-show="ids.length > 0" :icon="DeleteFilled" type="danger" @click="onRowDeleteWithChildren"> 彻底删除（包含删除子级内容） </el-button>
			</template>
		</TablePlusBar>
	</div>
</template>
