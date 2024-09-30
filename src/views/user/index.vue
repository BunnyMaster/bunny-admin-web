<script lang="ts" setup>
import { ref } from 'vue';
import tree from './tree.vue';
import { useUser } from './utils/hook';
import { PureTableBar } from '@/components/RePureTableBar';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';

import Upload from '@iconify-icons/ri/upload-line';
import Role from '@iconify-icons/ri/admin-line';
import Password from '@iconify-icons/ri/lock-password-line';
import More from '@iconify-icons/ep/more-filled';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import AddFill from '@iconify-icons/ri/add-circle-line';

defineOptions({
	name: 'SystemUser',
});

const treeRef = ref();
const formRef = ref();
const tableRef = ref();

const {
	form,
	loading,
	columns,
	dataList,
	treeData,
	treeLoading,
	selectedNum,
	pagination,
	buttonClass,
	deviceDetection,
	onSearch,
	resetForm,
	onbatchDel,
	openDialog,
	onTreeSelect,
	handleUpdate,
	handleDelete,
	handleUpload,
	handleReset,
	handleRole,
	handleSizeChange,
	onSelectionCancel,
	handleCurrentChange,
	handleSelectionChange,
} = useUser(tableRef, treeRef);
</script>

<template>
	<div :class="['flex', 'justify-between', deviceDetection() && 'flex-wrap']">
		<tree ref="treeRef" :class="['mr-2', deviceDetection() ? 'w-full' : 'min-w-[200px]']" :treeData="treeData" :treeLoading="treeLoading" @tree-select="onTreeSelect" />
		<div :class="[deviceDetection() ? ['w-full', 'mt-2'] : 'w-[calc(100%-200px)]']">
			<el-form ref="formRef" :inline="true" :model="form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
				<el-form-item label="用户名称：" prop="username">
					<el-input v-model="form.username" class="!w-[180px]" clearable placeholder="请输入用户名称" />
				</el-form-item>
				<el-form-item label="手机号码：" prop="phone">
					<el-input v-model="form.phone" class="!w-[180px]" clearable placeholder="请输入手机号码" />
				</el-form-item>
				<el-form-item label="状态：" prop="status">
					<el-select v-model="form.status" class="!w-[180px]" clearable placeholder="请选择">
						<el-option label="已开启" value="1" />
						<el-option label="已关闭" value="0" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button :icon="useRenderIcon('ri:search-line')" :loading="loading" type="primary" @click="onSearch"> 搜索 </el-button>
					<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> 重置 </el-button>
				</el-form-item>
			</el-form>

			<PureTableBar :columns="columns" title="用户管理（仅演示，操作后不生效）" @refresh="onSearch">
				<template #buttons>
					<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="openDialog()"> 新增用户 </el-button>
				</template>
				<template v-slot="{ size, dynamicColumns }">
					<div v-if="selectedNum > 0" v-motion-fade class="bg-[var(--el-fill-color-light)] w-full h-[46px] mb-2 pl-4 flex items-center">
						<div class="flex-auto">
							<span class="text-[rgba(42,46,54,0.5)] dark:text-[rgba(220,220,242,0.5)]" style="font-size: var(--el-font-size-base)"> 已选 {{ selectedNum }} 项 </span>
							<el-button text type="primary" @click="onSelectionCancel"> 取消选择 </el-button>
						</div>
						<el-popconfirm title="是否确认删除?" @confirm="onbatchDel">
							<template #reference>
								<el-button class="mr-1" text type="danger"> 批量删除 </el-button>
							</template>
						</el-popconfirm>
					</div>
					<pure-table
						ref="tableRef"
						:adaptiveConfig="{ offsetBottom: 108 }"
						:columns="dynamicColumns"
						:data="dataList"
						:header-cell-style="{
							background: 'var(--el-fill-color-light)',
							color: 'var(--el-text-color-primary)',
						}"
						:loading="loading"
						:pagination="{ ...pagination, size }"
						:size="size"
						adaptive
						align-whole="center"
						row-key="id"
						table-layout="auto"
						@selection-change="handleSelectionChange"
						@page-size-change="handleSizeChange"
						@page-current-change="handleCurrentChange"
					>
						<template #operation="{ row }">
							<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="openDialog('修改', row)"> 修改 </el-button>
							<el-popconfirm :title="`是否确认删除用户编号为${row.id}的这条数据`" @confirm="handleDelete(row)">
								<template #reference>
									<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary"> 删除 </el-button>
								</template>
							</el-popconfirm>
							<el-dropdown>
								<el-button :icon="useRenderIcon(More)" :size="size" class="ml-3 mt-[2px]" link type="primary" @click="handleUpdate(row)" />
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>
											<el-button :class="buttonClass" :icon="useRenderIcon(Upload)" :size="size" link type="primary" @click="handleUpload(row)"> 上传头像 </el-button>
										</el-dropdown-item>
										<el-dropdown-item>
											<el-button :class="buttonClass" :icon="useRenderIcon(Password)" :size="size" link type="primary" @click="handleReset(row)"> 重置密码 </el-button>
										</el-dropdown-item>
										<el-dropdown-item>
											<el-button :class="buttonClass" :icon="useRenderIcon(Role)" :size="size" link type="primary" @click="handleRole(row)"> 分配角色 </el-button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</template>
					</pure-table>
				</template>
			</PureTableBar>
		</div>
	</div>
</template>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item i) {
	margin: 0;
}

:deep(.el-button:focus-visible) {
	outline: none;
}

.main-content {
	margin: 24px 24px 0 !important;
}

.search-form {
	:deep(.el-form-item) {
		margin-bottom: 12px;
	}
}
</style>
