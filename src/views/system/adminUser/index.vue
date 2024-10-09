<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/system/adminUser/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import {
	deleteIds,
	deptList,
	onAdd,
	onAssignRolesToUser,
	onDelete,
	onDeleteBatch,
	onForcedOffline,
	onResetPassword,
	onSearch,
	onTreeSelect,
	onUpdate,
	onUploadAvatar,
	switchLoadMap,
	updateUserStatus,
} from '@/views/system/adminUser/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import userAvatar from '@/assets/user.jpg';
import Upload from '@iconify-icons/ri/upload-line';
import Role from '@iconify-icons/ri/admin-line';
import Password from '@iconify-icons/ri/lock-password-line';
import More from '@iconify-icons/ep/more-filled';
import { useAdminUserStore } from '@/store/system/adminUser';
import { sexConstant, tableSelectButtonClass, userStatus } from '@/enums/baseConstant';
import { deviceDetection } from '@pureadmin/utils';
import Tree from '@/views/system/adminUser/tree.vue';
import Airplane from '@/assets/svg/airplane.svg';
import { useDeptStore } from '@/store/system/dept';
import { FormInstance } from 'element-plus';
import { usePublicHooks } from '@/views/hooks';

const adminUserStore = useAdminUserStore();
const deptStore = useDeptStore();
// 用户是否停用样式
const { switchStyle } = usePublicHooks();
const tableRef = ref();
const formRef = ref();

/**
 * * 加载部门列表
 */
const onSearchDept = async () => {
	deptStore.loading = true;
	await deptStore.getAllDeptList();
	deptStore.loading = false;
};

/**
 * * 当前页改变时
 */
const onCurrentPageChange = async (value: number) => {
	adminUserStore.pagination.currentPage = value;
	await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
	adminUserStore.pagination.pageSize = value;
	await onSearch();
};

/**
 * 重置表单
 * @param formEl
 */
const resetForm = async (formEl: FormInstance) => {
	if (!formEl) return;
	formEl.resetFields();
	adminUserStore.form.deptIds = undefined;
	await onSearch();
};

/**
 * * 选择多行
 * @param rows
 */
const onSelectionChange = (rows: Array<any>) => {
	deleteIds.value = rows.map((row: any) => row.id);
};

onMounted(() => {
	onSearch();
	onSearchDept();
});
</script>

<template>
	<div :class="['flex', 'justify-between', deviceDetection() && 'flex-wrap']">
		<tree ref="treeRef" :class="['mr-2', deviceDetection() ? 'w-full' : 'min-w-[200px]']" :treeData="deptList" :treeLoading="deptStore.loading" @tree-select="onTreeSelect" />
		<div :class="[deviceDetection() ? ['w-full', 'mt-2'] : 'w-[calc(100%-200px)]']">
			<el-form ref="formRef" :inline="true" :model="adminUserStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
				<!-- 查询用户名 -->
				<el-form-item :label="$t('adminUser_username')" prop="username">
					<el-input v-model="adminUserStore.form.username" :placeholder="`${$t('input')}${$t('adminUser_username')}`" class="!w-[180px]" clearable />
				</el-form-item>

				<!-- 查询昵称 -->
				<el-form-item :label="$t('adminUser_nickName')" prop="nickName">
					<el-input v-model="adminUserStore.form.nickName" :placeholder="`${$t('input')}${$t('adminUser_nickName')}`" class="!w-[180px]" clearable />
				</el-form-item>

				<!-- 查询邮箱 -->
				<el-form-item :label="$t('adminUser_email')" prop="email">
					<el-input v-model="adminUserStore.form.email" :placeholder="`${$t('input')}${$t('adminUser_email')}`" class="!w-[180px]" clearable />
				</el-form-item>

				<!-- 查询手机号 -->
				<el-form-item :label="$t('adminUser_phone')" prop="phone">
					<el-input v-model="adminUserStore.form.phone" :placeholder="`${$t('input')}${$t('adminUser_phone')}`" class="!w-[180px]" clearable />
				</el-form-item>

				<!-- 查询性别 -->
				<el-form-item :label="$t('adminUser_sex')" prop="sex">
					<el-select v-model="adminUserStore.form.sex" :placeholder="`${$t('input')}${$t('adminUser_sex')}`" class="!w-[180px]" clearable filterable>
						<el-option v-for="(item, index) in sexConstant" :key="index" :label="item.label" :navigationBar="false" :value="item.value" />
					</el-select>
				</el-form-item>

				<!-- 查询简介 -->
				<el-form-item :label="$t('adminUser_summary')" prop="summary">
					<el-input v-model="adminUserStore.form.summary" :placeholder="`${$t('input')}${$t('adminUser_summary')}`" class="!w-[180px]" clearable />
				</el-form-item>

				<!-- 查询状态 -->
				<el-form-item :label="$t('adminUser_status')" prop="status">
					<el-select v-model="adminUserStore.form.status" :placeholder="`${$t('input')}${$t('adminUser_status')}`" class="!w-[180px]" clearable filterable>
						<el-option v-for="(item, index) in userStatus" :key="index" :label="item.label" :navigationBar="false" :value="item.value" />
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button :icon="useRenderIcon('ri:search-line')" :loading="adminUserStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
					<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
				</el-form-item>
			</el-form>

			<PureTableBar :columns="columns" title="用户信息" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
				<template #buttons>
					<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> {{ $t('add_new') }}</el-button>

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
						:data="adminUserStore.datalist"
						:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
						:loading="adminUserStore.loading"
						:pagination="adminUserStore.pagination"
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
						<!-- 显示头像 -->
						<template #avatar="{ row }">
							<el-image :preview-src-list="Array.of(row.avatar || userAvatar)" :src="row.avatar || userAvatar" class="w-[24px] h-[24px] rounded-full align-middle" fit="cover" preview-teleported />
						</template>

						<!-- 显示用户状态 -->
						<template #status="{ row, index }">
							<el-switch
								v-model="row.status"
								:active-value="false"
								:inactive-value="true"
								:loading="switchLoadMap[index]?.loading"
								:style="switchStyle"
								active-text="已启用"
								inactive-text="已停用"
								inline-prompt
								@click="updateUserStatus(row, index)"
							/>
						</template>

						<!-- 用户性别 -->
						<template #sex="{ row }">
							<el-tag :type="row.sex === 0 ? 'danger' : null" effect="plain"> {{ row.sex === 1 ? '男' : '女' }}</el-tag>
						</template>

						<!-- 创建用户 -->
						<template #createUser="{ row }">
							<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
						</template>

						<!-- 更新用户 -->
						<template #updateUser="{ row }">
							<el-button link type="primary" @click="selectUserinfo(row.updateUser)">{{ $t('table.updateUser') }} </el-button>
						</template>

						<template #operation="{ row }">
							<!-- 修改 -->
							<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>

							<!-- 删除 -->
							<el-popconfirm :title="`是否确认删除 ${row.username}数据`" @confirm="onDelete(row)">
								<template #reference>
									<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
										{{ $t('delete') }}
									</el-button>
								</template>
							</el-popconfirm>

							<!-- 更多操作 -->
							<el-dropdown>
								<el-button :icon="useRenderIcon(More)" :size="size" class="ml-3 mt-[2px]" link type="primary" />
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>
											<el-button :class="tableSelectButtonClass" :icon="useRenderIcon(Upload)" :size="size" link type="primary" @click="onUploadAvatar(row)"> 上传头像 </el-button>
										</el-dropdown-item>
										<el-dropdown-item>
											<el-button :class="tableSelectButtonClass" :icon="useRenderIcon(Password)" :size="size" link type="primary" @click="onResetPassword(row)"> 重置密码 </el-button>
										</el-dropdown-item>
										<el-dropdown-item>
											<el-button :class="tableSelectButtonClass" :icon="useRenderIcon(Role)" :size="size" link type="primary" @click="onAssignRolesToUser(row)"> 分配角色 </el-button>
										</el-dropdown-item>
										<el-dropdown-item>
											<el-button :class="tableSelectButtonClass" :icon="useRenderIcon(Airplane)" :size="size" link type="primary" @click="onForcedOffline(row)"> 强制下线 </el-button>
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
