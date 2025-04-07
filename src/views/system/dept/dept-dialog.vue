<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { deptSelector, FormProps, rules } from '@/views/system/dept/utils';
import { $t } from '@/plugins/i18n';
import { useDeptStore } from '@/store/system/dept';
import { handleTree } from '@pureadmin/utils';
import LoadingSvg from '@/assets/svg/loading.svg';
import { useAdminUserStore } from '@/store/system/adminUser';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 父级id
		parentId: undefined,
		// 管理者id
		manager: undefined,
		// 部门名称
		deptName: undefined,
		// 部门简介
		summary: undefined,
	}),
});

const deptStore = useDeptStore();
const adminUserStore = useAdminUserStore();
const formRef = ref<FormInstance>();
const form = ref(props.formInline);
const loading = ref(false);
const userDataList = ref();

/** 搜索 */
const onSearchUserinfo = async (keyword: string) => {
	loading.value = true;
	userDataList.value = await adminUserStore.queryUser({ keyword });
	loading.value = false;
};

onMounted(() => {
	deptStore.getAllDeptList();
});

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<!-- 父级ID -->
		<el-form-item :label="$t('dept_parentId')" prop="parentId">
			<el-cascader v-model="form.parentId" :options="handleTree(deptStore.allDeptList)" :props="deptSelector" class="w-full" clearable filterable show-all-levels />
		</el-form-item>

		<!-- 管理员 -->
		<el-form-item :label="$t('dept_manager')" prop="manager">
			<el-select v-model="form.manager" :loading="loading" :placeholder="$t('receivedUserIdTip')" :remote-method="onSearchUserinfo" clearable filterable multiple remote remote-show-suffix>
				<el-option v-for="item in userDataList" :key="item.id" :label="item.username" :value="item.username" />
				<template #loading>
					<el-icon class="is-loading">
						<LoadingSvg />
					</el-icon>
				</template>
			</el-select>
		</el-form-item>

		<!-- 部门名称-->
		<el-form-item :label="$t('dept_deptName')" prop="deptName">
			<el-input v-model="form.deptName" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 简介 -->
		<el-form-item :label="$t('dept_summary')" prop="summary">
			<el-input v-model="form.summary" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
