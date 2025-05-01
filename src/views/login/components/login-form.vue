<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import User from '~icons/ri/user-3-fill';
import Lock from '~icons/ri/lock-fill';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/system/user';
import { message } from '@/utils/message';
import { getTopMenu, initRouter } from '@/router/utils';
import Motion from '../utils';
import { ElMessage, FormInstance } from 'element-plus';
import { currentPage, formRules } from '@/views/login/utils';

const router = useRouter();
const userStore = useUserStore();
const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const { t } = useI18n();

const ruleForm = reactive({
  username: 'Administrator',
  password: 'admin123',
  type: currentPage.value,
});

/**
 * 登录
 * @param formEl
 */
const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      const result = await userStore.loginByUsername(ruleForm);

      if (result) {
        // 获取后端路由
        await initRouter();
        router.push(getTopMenu(true).path).then(() => {
          ElMessage.closeAll();
          message(t('login.loginSuccess'), { type: 'success' });
        });
      }

      loading.value = false;
    }
  });
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
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="formRules" size="large">
    <Motion>
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" :placeholder="t('login.username')" :prefix-icon="useRenderIcon(User)" clearable />
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" :placeholder="t('login.password')" :prefix-icon="useRenderIcon(Lock)" clearable show-password />
        <el-checkbox v-model="userStore.isRemembered">
          <el-text size="small" type="primary">{{ userStore.readMeDay }}天免登录</el-text>
        </el-checkbox>
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item>
        <el-button :loading="loading" class="w-full" size="default" type="primary" @click="onLogin(ruleFormRef)">
          {{ t('login.login') }}
        </el-button>
      </el-form-item>
    </Motion>

    <!-- 邮箱登录 -->
    <Motion :delay="300">
      <el-form-item>
        <el-button class="w-full" size="default" @click="currentPage = 'email'">邮箱登录</el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>
