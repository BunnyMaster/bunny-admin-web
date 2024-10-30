<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns, editorTypeList } from '@/views/systemMaintenance/message/message/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { deleteIds, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/systemMaintenance/message/message/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useMessageStore } from '@/store/message/message';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { FormInstance } from 'element-plus';

const tableRef = ref();
const formRef = ref();
const messageStore = useMessageStore();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
	messageStore.pagination.currentPage = value;
	await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
	messageStore.pagination.pageSize = value;
	await onSearch();
};

/**
 * * 选择多行
 * @param rows
 */
const onSelectionChange = (rows: Array<any>) => {
	deleteIds.value = rows.map((row: any) => row.id);
};

/**
 * 重置表单
 * @param formEl
 */
const resetForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	await onSearch();
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="messageStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<!-- 消息标题 -->
			<el-form-item :label="$t('title')" prop="title">
				<el-input v-model="messageStore.form.title" :placeholder="`${$t('input')}${$t('title')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 发送人昵称 -->
			<el-form-item :label="$t('sendNickname')" prop="sendNickname">
				<el-input v-model="messageStore.form.sendNickname" :placeholder="`${$t('input')}${$t('sendNickname')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 消息类型 -->
			<el-form-item :label="$t('messageType')" prop="messageType">
				<el-input v-model="messageStore.form.messageType" :placeholder="`${$t('input')}${$t('messageType')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 消息内容 -->
			<el-form-item :label="$t('content')" prop="content">
				<el-input v-model="messageStore.form.content" :placeholder="`${$t('input')}${$t('content')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 编辑器类型 -->
			<el-form-item :label="$t('editorType')" prop="editorType">
				<el-select v-model="messageStore.form.editorType" :placeholder="`${$t('select')}${$t('editorType')}`" class="!w-[180px]" clearable filterable>
					<el-option v-for="(item, index) in editorTypeList" :key="index" :label="item.label" :navigationBar="false" :value="item.value" />
				</el-select>
			</el-form-item>

			<!-- 0:未读 1:已读 -->
			<el-form-item :label="$t('status')" prop="status">
				<el-input v-model="messageStore.form.status" :placeholder="`${$t('input')}${$t('status')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="messageStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" title="系统消息" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> {{ $t('addNew') }}</el-button>

				<!-- 批量删除按钮 -->
				<el-button v-show="deleteIds.length > 0" :icon="useRenderIcon(Delete)" type="danger" @click="onDeleteBatch">
					{{ $t('delete_batches') }}
				</el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 96 }"
					:columns="dynamicColumns"
					:data="messageStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="messageStore.loading"
					:pagination="messageStore.pagination"
					:size="size"
					adaptive
					align-whole="center"
					border
					highlight-current-row
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
					@page-size-change="onPageSizeChange"
					@selection-change="onSelectionChange"
					@page-current-change="onCurrentPageChange"
				>
					<template #createUser="{ row }">
						<el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
							{{ row.createUsername }}
						</el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
							{{ row.updateUsername }}
						</el-button>
					</template>

					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>
						<el-popconfirm :title="`${$t('delete')}${row.title}?`" @confirm="onDelete(row)">
							<template #reference>
								<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
									{{ $t('delete') }}
								</el-button>
							</template>
						</el-popconfirm>
					</template>
				</pure-table>
			</template>
		</PureTableBar>
	</div>
</template>
