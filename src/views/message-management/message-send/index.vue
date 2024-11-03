<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/message-management/message-send/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import PureTable from '@pureadmin/table';
import { deleteIds, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/message-management/message-send/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { FormInstance } from 'element-plus';
import { messageLevel } from '@/views/message-management/message-editing/utils/columns';
import { isReadStatus } from '@/enums/baseConstant';
import { useMessageSendStore } from '@/store/message/messageSend';

const tableRef = ref();
const formRef = ref();
const messageSendStore = useMessageSendStore();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
	messageSendStore.pagination.currentPage = value;
	await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
	messageSendStore.pagination.pageSize = value;
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

			<!-- 消息类型 -->
			<el-form-item :label="$t('messageType')" prop="messageType">
				<el-input v-model="messageStore.form.messageType" :placeholder="`${$t('input')}${$t('messageType')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 消息等级 -->
			<el-form-item :label="$t('level')" prop="level">
				<el-select v-model="messageStore.form.level" :placeholder="$t('level')" class="!w-[180px]" clearable filterable remote remote-show-suffix>
					<el-option v-for="item in messageLevel" :key="item" :label="$t(item)" :value="item" />
				</el-select>
			</el-form-item>

			<!-- 消息等级简介 -->
			<el-form-item :label="$t('extra')" prop="extra">
				<el-input v-model="messageStore.form.extra" class="!w-[180px]" maxlength="20" minlength="10" show-word-limit type="text" />
			</el-form-item>

			<!-- 0:未读 1:已读 -->
			<el-form-item :label="$t('status')" prop="status">
				<el-select v-model="messageStore.form.status" :placeholder="$t('status')" class="!w-[180px]" clearable filterable remote remote-show-suffix>
					<el-option v-for="(item, index) in isReadStatus" :key="index" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>

			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="messageStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" title="系统消息" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
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
					<template #cover="{ row }">
						<el-image :initial-index="0" :preview-src-list="[row.cover]" :src="row.cover" class="w-[50px] h-[50px]" fit="cover" loading="lazy" preview-teleported />
					</template>

					<template #extra="{ row }">
						<el-text type="danger">{{ row.extra }}</el-text>
					</template>

					<template #messageType="{ row }">
						<el-tag effect="plain" round>{{ row.messageType }}</el-tag>
					</template>

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
