<script lang="tsx" setup>
import { reactive, ref } from 'vue';
import { deviceDetection } from '@pureadmin/utils';
import { $t } from '@/plugins/i18n';
import { addDialog } from '@/components/BaseDialog/index';
import { useAdminUserStore } from '@/store/system/adminUser';
import ResetPasswordDialog from '@/components/Table/ResetPasswords.vue';
import { removeToken } from '@/utils/auth';
import { useRouter } from 'vue-router';

// 重置密码表单校验Ref
const ruleFormByRestPasswordRef = ref();
const adminUserStore = useAdminUserStore();
const router = useRouter();

// 重置密码表单
const restPasswordForm = reactive({
	password: '',
});

/** 重置密码 */
const onResetPassword = () => {
	addDialog({
		title: `修改密码`,
		width: '30%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		destroyOnClose: true,
		contentRenderer: () => <ResetPasswordDialog ref={ruleFormByRestPasswordRef} form={restPasswordForm} />,
		beforeSure: (done: any) => {
			ruleFormByRestPasswordRef.value.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					// 更新用户密码
					const data = { password: restPasswordForm.password };
					const result = await adminUserStore.updateUserPasswordByLocalUser(data);

					// 更新成功关闭弹窗
					if (!result) return;
					done();
					removeToken();
					await router.push('/login');
				}
			});
		},
	});
};

const list = ref([
	{
		title: $t('account_password'),
		illustrate: $t('rest_password_tip'),
		button: $t('modify'),
		callback: onResetPassword,
	},
	// {
	// 	title: '密保手机',
	// 	illustrate: '已经绑定手机：158****6789',
	// 	button: '修改',
	// },
	// {
	// 	title: '密保问题',
	// 	illustrate: '未设置密保问题，密保问题可有效保护账户安全',
	// 	button: '修改',
	// },
	// {
	// 	title: '备用邮箱',
	// 	illustrate: '已绑定邮箱：pure***@163.com',
	// 	button: '修改',
	// },
]);
</script>

<template>
	<div :class="['min-w-[180px]', deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]']">
		<h3 class="my-8">{{ $t('account_management') }}</h3>
		<div v-for="(item, index) in list" :key="index">
			<div class="flex items-center">
				<div class="flex-1">
					<p>{{ item.title }}</p>
					<el-text class="mx-1" type="info">{{ item.illustrate }}</el-text>
				</div>
				<el-button text type="primary" @click="item.callback">
					{{ item.button }}
				</el-button>
			</div>
			<el-divider />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.el-divider--horizontal {
	border-top: 0.1px var(--el-border-color) var(--el-border-style);
}
</style>
