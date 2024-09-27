<script lang="ts" setup>
import TablePlusBar from '@/components/TableBar/src/TablePlusBar.vue';
import { onMounted, ref } from 'vue';
import { columns, editMap, onCancel, onEdit, onSave } from '@/views/i18n/language-type-setting/utils/columns';
import { DeleteFilled, EditPen, Plus } from '@element-plus/icons-vue';
import { useI18nTypeStore } from '@/store/i18n/i18nType';
import { messageBox } from '@/utils/message';
import AddLanguageType from '@/views/i18n/language-type-setting/add-language-tyoe.vue';

const column = ref(columns);
const i18nTypeStore = useI18nTypeStore();

/**
 * * 获取多语言类型
 */
const getLanguageType = () => {
	i18nTypeStore.getLanguageType();
};

/**
 * * 表格的列添加语言类型
 */
const onColumnAdd = () => {
	i18nTypeStore.isAddShown = true;
};

/**
 * * 删除多语言类容
 */
const onColumnDelete = async (row: any, isPhysicalDelete: boolean) => {
	const id = row.id;
	const title = isPhysicalDelete ? '物理删除不可逆！' : '确认删除吗？';

	messageBox({
		message: `删除这条 【${row.summary}】 `,
		title,
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: '取消删除',
	})
		.then(result => {
			if (result) {
				// 物理删除
				isPhysicalDelete && i18nTypeStore.removeLanguageType(id);
				// 逻辑删除
				!isPhysicalDelete && i18nTypeStore.deleteLanguageType(id);
			}
			return result;
		})
		.then(result => result && getLanguageType());
};

onMounted(() => {
	getLanguageType();
});
</script>

<template>
	<div>
		<!-- 添加多语言种类 -->
		<add-language-type />
		<TablePlusBar
			:column="column"
			:data-list="i18nTypeStore.dataList"
			:loading="i18nTypeStore.loading"
			:on-re-fresh="getLanguageType"
			:table-delete="onColumnDelete"
			:table-query-form-visible="false"
			@changeColumn="args => (column = args)"
		>
			<!-- 表格头部按钮 -->
			<template #tableButtons>
				<el-button :icon="Plus" type="primary" @click="onColumnAdd">{{ $t('buttons.add') }}</el-button>
			</template>

			<template #op="{ row, index }">
				<div v-if="!editMap[index]?.editable" class="flex justify-around">
					<el-button :icon="EditPen" link type="warning" @click="onEdit(row, index)">修改</el-button>
					<el-dropdown :hide-on-click="false">
						<el-link :icon="DeleteFilled" :underline="false" type="danger"> 删除选项</el-link>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>
									<el-button :icon="DeleteFilled" link type="warning" @click="onColumnDelete(row, false)">删除 </el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button :icon="DeleteFilled" link type="danger" @click="onColumnDelete(row, true)">彻底删除 </el-button>
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>

				<div v-else>
					<el-button class="reset-margin" link type="primary" @click="onSave(row, index)"> 保存</el-button>
					<el-button class="reset-margin" link @click="onCancel(index)"> 取消</el-button>
				</div>
			</template>
		</TablePlusBar>
	</div>
</template>
