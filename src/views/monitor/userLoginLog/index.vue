<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/monitor/userLoginLog/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import PureTable from '@pureadmin/table';
import { deleteIds, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/monitor/userLoginLog/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useUserLoginLogStore } from '@/store/monitor/userLoginLog';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { FormInstance } from 'element-plus';

const tableRef = ref();
const formRef = ref();
const userLoginLogStore = useUserLoginLogStore();

/**
 * * 当前页改变时
 */
const onCurrentPageChange = async (value: number) => {
	userLoginLogStore.pagination.currentPage = value;
	await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
	userLoginLogStore.pagination.pageSize = value;
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
		<el-form ref="formRef" :inline="true" :model="userLoginLogStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<!-- 用户Id -->
			<el-form-item :label="$t('userLoginLog_userId')" prop="userId">
				<el-input v-model="userLoginLogStore.form.userId" :placeholder="`${$t('input')}${$t('userLoginLog_userId')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 用户名 -->
			<el-form-item :label="$t('userLoginLog_username')" prop="username">
				<el-input v-model="userLoginLogStore.form.username" :placeholder="`${$t('input')}${$t('userLoginLog_username')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 登录token -->
			<el-form-item :label="$t('userLoginLog_token')" prop="token">
				<el-input v-model="userLoginLogStore.form.token" :placeholder="`${$t('input')}${$t('userLoginLog_token')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 登录Ip -->
			<el-form-item :label="$t('userLoginLog_ipAddress')" prop="ipAddress">
				<el-input v-model="userLoginLogStore.form.ipAddress" :placeholder="`${$t('input')}${$t('userLoginLog_ipAddress')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 登录Ip归属地 -->
			<el-form-item :label="$t('userLoginLog_ipRegion')" prop="ipRegion">
				<el-input v-model="userLoginLogStore.form.ipRegion" :placeholder="`${$t('input')}${$t('userLoginLog_ipRegion')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 登录时代理 -->
			<el-form-item :label="$t('userLoginLog_userAgent')" prop="userAgent">
				<el-input v-model="userLoginLogStore.form.userAgent" :placeholder="`${$t('input')}${$t('userLoginLog_userAgent')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 操作类型 -->
			<el-form-item :label="$t('userLoginLog_type')" prop="type">
				<el-input v-model="userLoginLogStore.form.type" :placeholder="`${$t('input')}${$t('userLoginLog_type')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 标识客户端是否是通过Ajax发送请求的 -->
			<el-form-item :label="$t('userLoginLog_xRequestedWith')" prop="xRequestedWith">
				<el-input v-model="userLoginLogStore.form.xRequestedWith" :placeholder="`${$t('input')}${$t('userLoginLog_xRequestedWith')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 用户代理的品牌和版本 -->
			<el-form-item :label="$t('userLoginLog_secChUa')" prop="secChUa">
				<el-input v-model="userLoginLogStore.form.secChUa" :placeholder="`${$t('input')}${$t('userLoginLog_secChUa')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 用户代理的底层平台架构 -->
			<el-form-item :label="$t('userLoginLog_secChUaArch')" prop="secChUaArch">
				<el-input v-model="userLoginLogStore.form.secChUaArch" :placeholder="`${$t('input')}${$t('userLoginLog_secChUaArch')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 用户代理的底层CPU架构位数 -->
			<el-form-item :label="$t('userLoginLog_secChUaBitness')" prop="secChUaBitness">
				<el-input v-model="userLoginLogStore.form.secChUaBitness" :placeholder="`${$t('input')}${$t('userLoginLog_secChUaBitness')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 用户代理是否在手机设备上运行 -->
			<el-form-item :label="$t('userLoginLog_secChUaMobile')" prop="secChUaMobile">
				<el-input v-model="userLoginLogStore.form.secChUaMobile" :placeholder="`${$t('input')}${$t('userLoginLog_secChUaMobile')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 用户代理的设备模型 -->
			<el-form-item :label="$t('userLoginLog_secChUaModel')" prop="secChUaModel">
				<el-input v-model="userLoginLogStore.form.secChUaModel" :placeholder="`${$t('input')}${$t('userLoginLog_secChUaModel')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 用户代理的底层操作系统/平台 -->
			<el-form-item :label="$t('userLoginLog_secChUaPlatform')" prop="secChUaPlatform">
				<el-input v-model="userLoginLogStore.form.secChUaPlatform" :placeholder="`${$t('input')}${$t('userLoginLog_secChUaPlatform')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 用户代理的底层操作系统版本 -->
			<el-form-item :label="$t('userLoginLog_secChUaPlatformVersion')" prop="secChUaPlatformVersion">
				<el-input v-model="userLoginLogStore.form.secChUaPlatformVersion" :placeholder="`${$t('input')}${$t('userLoginLog_secChUaPlatformVersion')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 客户端设备像素比 -->
			<el-form-item :label="$t('userLoginLog_contentDpr')" prop="contentDpr">
				<el-input v-model="userLoginLogStore.form.contentDpr" :placeholder="`${$t('input')}${$t('userLoginLog_contentDpr')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 客户端RAM内存的近似值 -->
			<el-form-item :label="$t('userLoginLog_deviceMemory')" prop="deviceMemory">
				<el-input v-model="userLoginLogStore.form.deviceMemory" :placeholder="`${$t('input')}${$t('userLoginLog_deviceMemory')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 客户端设备像素比 -->
			<el-form-item :label="$t('userLoginLog_dpr')" prop="dpr">
				<el-input v-model="userLoginLogStore.form.dpr" :placeholder="`${$t('input')}${$t('userLoginLog_dpr')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 布局视口宽度 -->
			<el-form-item :label="$t('userLoginLog_viewportWidth')" prop="viewportWidth">
				<el-input v-model="userLoginLogStore.form.viewportWidth" :placeholder="`${$t('input')}${$t('userLoginLog_viewportWidth')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 所需资源宽度 -->
			<el-form-item :label="$t('userLoginLog_width')" prop="width">
				<el-input v-model="userLoginLogStore.form.width" :placeholder="`${$t('input')}${$t('userLoginLog_width')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 客户端连接到服务器的近似带宽 -->
			<el-form-item :label="$t('userLoginLog_downlink')" prop="downlink">
				<el-input v-model="userLoginLogStore.form.downlink" :placeholder="`${$t('input')}${$t('userLoginLog_downlink')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 有效连接类型 -->
			<el-form-item :label="$t('userLoginLog_ect')" prop="ect">
				<el-input v-model="userLoginLogStore.form.ect" :placeholder="`${$t('input')}${$t('userLoginLog_ect')}`" class="!w-[180px]" clearable />
			</el-form-item>

			<!-- 应用层往返时间 -->
			<el-form-item :label="$t('userLoginLog_rtt')" prop="rtt">
				<el-input v-model="userLoginLogStore.form.rtt" :placeholder="`${$t('input')}${$t('userLoginLog_rtt')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="userLoginLogStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" title="用户登录日志" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
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
					:data="userLoginLogStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="userLoginLogStore.loading"
					:pagination="userLoginLogStore.pagination"
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
						<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.updateUser)">{{ $t('table.updateUser') }} </el-button>
					</template>

					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>
						<el-popconfirm :title="`${$t('delete')}${row.username}?`" @confirm="onDelete(row)">
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
