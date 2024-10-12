<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { isAddUserinfo, rules } from '@/views/system/adminUser/utils/columns';
import { FormProps } from '@/views/system/adminUser/utils/types';
import { $t } from '@/plugins/i18n';
import ReCol from '@/components/MyCol';
import { sexConstant } from '@/enums/baseConstant';
import { deptSelector } from '@/views/system/dept/utils/columns';
import { deptList } from '@/views/system/adminUser/utils/hooks';
import { usePublicHooks } from '@/views/hooks';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 用户名
		username: undefined,
		// 昵称
		nickName: undefined,
		// 邮箱
		email: undefined,
		// 手机号
		phone: undefined,
		// 密码
		password: undefined,
		// 头像
		avatar: undefined,
		// 性别
		sex: undefined,
		// 个人描述
		summary: undefined,
		// 状态
		status: undefined,
		// 部门
		deptId: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);
// 用户是否停用样式
const { switchStyle } = usePublicHooks();

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="auto">
		<el-row :gutter="30">
			<!-- 用户名 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('adminUser_username')" prop="username">
					<el-input v-model="form.username" :placeholder="$t('adminUser_username')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 昵称 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('adminUser_nickName')" prop="nickName">
					<el-input v-model="form.nickName" :placeholder="$t('adminUser_nickName')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 邮箱 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('adminUser_email')" prop="email">
					<el-input v-model="form.email" :placeholder="$t('adminUser_email')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 密码 -->
			<re-col v-show="isAddUserinfo" :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('adminUser_password')" prop="password">
					<el-input v-model="form.password" :placeholder="$t('adminUser_password')" autocomplete="off" show-password type="password" />
				</el-form-item>
			</re-col>

			<!-- 手机号 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('adminUser_phone')" prop="phone">
					<el-input v-model="form.phone" :placeholder="$t('adminUser_phone')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 性别 -->
			<re-col :sm="24" :value="isAddUserinfo ? 12 : 24" :xs="24">
				<el-form-item :label="$t('adminUser_sex')" prop="sex">
					<el-select v-model="form.sex" :placeholder="$t('adminUser_sex')" clearable filterable>
						<el-option v-for="(item, index) in sexConstant" :key="index" :label="item.label" :navigationBar="false" :value="item.value" />
					</el-select>
				</el-form-item>
			</re-col>

			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('adminUser_dept')" prop="deptId">
					<el-cascader v-model="form.deptId" :options="deptList" :props="deptSelector" class="w-full" clearable filterable placeholder="请选择归属部门">
						<template #default="{ node, data }">
							<span>{{ data.deptName }}</span>
							<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
						</template>
					</el-cascader>
				</el-form-item>
			</re-col>

			<!-- 用户状态 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('adminUser_status')" prop="status">
					<el-switch v-model="form.status" :active-value="false" :inactive-value="true" :style="switchStyle" active-text="已启用" inactive-text="已停用" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 用户简介 -->
			<re-col :sm="24" :value="24" :xs="24">
				<el-form-item :label="$t('adminUser_summary')" prop="summary">
					<el-input v-model="form.summary" :placeholder="$t('adminUser_summary')" autocomplete="off" maxlength="200" show-word-limit type="textarea" />
				</el-form-item>
			</re-col>
		</el-row>
	</el-form>
</template>
