<script lang="ts" setup>
import { emailRules } from '@/views/login/utils/rule';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import User from '@iconify-icons/ri/user-3-fill';
import Lock from '@iconify-icons/ri/lock-fill';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/system/user';
import { message } from '@/utils/message';
import { getTopMenu, initRouter } from '@/router/utils';
import Motion from './utils/motion';
import { ElMessage, FormInstance } from 'element-plus';
import { currentPage, onBack } from '@/views/login/utils/hooks';

const router = useRouter();
const userStore = useUserStore();
const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const sendSecond = ref(60);
const timer = ref(null);
const { t } = useI18n();

const ruleForm = reactive({
	username: '1319900154@qq.com',
	password: 'admin123',
	emailCode: '1',
	type: currentPage.value,
});

/**
 * * 发送邮箱验证码
 */
const onSendEmailCode = async () => {
	// 判断是否填写邮箱，如果没有填写邮箱不给发送验证码
	if (ruleForm.username === '' || ruleForm.username === void 0) {
		message('请先填写邮箱地址', { type: 'warning' });
		return false;
	}
	const result = await userStore.postEmailCode(ruleForm.username);
	if (result) {
		// 开始倒计时，之后发送邮箱验证码
		onSendEmailTimer();
	}
};

/**
 * * 发送邮箱倒计时点击
 */
const onSendEmailTimer = () => {
	// 开始倒计时
	timer.value = setInterval(() => {
		// 当定时小于0时清除定时器
		if (sendSecond.value <= 0) {
			clearInterval(timer.value);
			timer.value = null;
			sendSecond.value = 60;
			return;
		}

		// 之后每秒减去时间
		sendSecond.value--;
	}, 1000);
};

/**
 * 登录
 * @param formEl
 */
const onLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	loading.value = true;

	// 开始登录
	await formEl.validate(async valid => {
		if (valid) {
			const result = await userStore.loginByUsername(ruleForm);

			if (result) {
				// 获取后端路由
				await initRouter();
				router.push(getTopMenu(true).path).then(() => {
					ElMessage.closeAll();
					message(t('login.loginSuccess'), { type: 'success' });
				});
			}
		}
	});

	loading.value = false;
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
	if (['Enter', 'NumpadEnter'].includes(code)) {
		onLogin(ruleFormRef.value);
	}
}

onMounted(() => {
	window.document.addEventListener('keypress', onkeypress);
});

onBeforeUnmount(() => {
	window.document.removeEventListener('keypress', onkeypress);
});
</script>

<template>
	<el-form ref="ruleFormRef" :model="ruleForm" :rules="emailRules" size="large">
		<Motion :delay="100">
			<el-form-item prop="username">
				<el-input v-model="ruleForm.username" :placeholder="t('login.username')" :prefix-icon="useRenderIcon(User)" clearable />
			</el-form-item>
		</Motion>

		<Motion :delay="150">
			<el-form-item prop="password">
				<el-input v-model="ruleForm.password" :placeholder="t('login.password')" :prefix-icon="useRenderIcon(Lock)" clearable show-password />
			</el-form-item>
		</Motion>

		<Motion :delay="150">
			<el-form-item prop="emailCode">
				<el-input v-model="ruleForm.emailCode" :placeholder="t('login.emailCode')" :prefix-icon="useRenderIcon('ic:outline-email')" clearable @keydown.enter="onLogin(ruleFormRef)">
					<template v-slot:append>
						<el-link v-if="sendSecond === 60" :underline="false" class="px-2" type="primary" @click="onSendEmailCode">
							{{ t('login.getEmailCode') }}
						</el-link>
						<el-link v-else :underline="false" class="px-2" type="primary">
							{{ sendSecond }}
							{{ t('login.getCodeInfo') }}
						</el-link>
					</template>
				</el-input>
				<el-checkbox v-model="userStore.isRemembered">
					<el-text size="small" type="primary">{{ userStore.readMeDay }}天免登录(邮箱验证码随便输入,后端校验验证码已注释) </el-text>
				</el-checkbox>
			</el-form-item>
		</Motion>

		<Motion :delay="250">
			<el-button :loading="loading" class="w-full" size="default" type="primary" @click="onLogin(ruleFormRef)">
				{{ t('login.login') }}
			</el-button>
		</Motion>

		<Motion :delay="200">
			<el-form-item>
				<el-button class="w-full mt-4" size="default" @click="onBack">
					{{ t('login.pureBack') }}
				</el-button>
			</el-form-item>
		</Motion>
	</el-form>
</template>
