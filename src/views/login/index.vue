<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { $t } from "@/plugins/i18n";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStore } from "@/store/modules/user";
import { avatar, bg, illustration } from "./utils/static";
import { useRenderIcon } from "@/components/CommonIcon/src/hooks";
import { onBeforeUnmount, onMounted, reactive, ref, toRaw } from "vue";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import globalization from "@/assets/svg/globalization.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import Check from "@iconify-icons/ep/check";
import User from "@iconify-icons/ri/user-3-fill";
import { getTopMenu, initRouter } from "@/router/utils";

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const sendSecond = ref(60);
const timer = ref(null);

const { initStorage } = useLayout();
initStorage();

const { t } = useI18n();
const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();
const userStore = useUserStore();

const ruleForm = reactive({
  username: "1319900154@qq.com",
  password: "admin123",
  emailCode: ""
});

/**
 * * 发送邮箱验证码
 */
const onSendEmailCode = async () => {
  // 判断是否填写邮箱，如果没有填写邮箱不给发送验证码
  if (ruleForm.username === "" || ruleForm.username === void 0) {
    message("请先填写邮箱地址", { type: "warning" });
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
  await formEl.validate(async valid => {
    if (valid) {
      loading.value = true;
      const result = await userStore.loginByUsername(ruleForm);

      if (result) {
        // 获取后端路由
        await initRouter();
        router.push(getTopMenu(true).path).then(() => {
          message(t("login.loginSuccess"), { type: "success" });
        });
      } else {
        message(t("login.loginFail"), { type: "error" });
      }

      loading.value = false;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" alt="" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        inline-prompt
        @change="dataThemeChange"
      />
      <!-- 国际化 -->
      <el-dropdown trigger="click">
        <globalization
          class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300"
        />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]"
              :style="getDropdownItemStyle(locale, 'zh')"
              @click="translationCh"
            >
              <IconifyIconOffline
                v-show="locale === 'zh'"
                :icon="Check"
                class="check-zh"
              />
              简体中文
            </el-dropdown-item>
            <el-dropdown-item
              :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
              :style="getDropdownItemStyle(locale, 'en')"
              @click="translationEn"
            >
              <span v-show="locale === 'en'" class="check-en">
                <IconifyIconOffline :icon="Check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: $t('login.usernameRegex'),
                    trigger: 'blur'
                  }
                ]"
                prop="username"
              >
                <el-input
                  v-model="ruleForm.username"
                  :placeholder="t('login.username')"
                  :prefix-icon="useRenderIcon(User)"
                  clearable
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  :placeholder="t('login.password')"
                  :prefix-icon="useRenderIcon(Lock)"
                  clearable
                  show-password
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="emailCode">
                <el-input
                  v-model="ruleForm.emailCode"
                  :placeholder="t('login.emailCode')"
                  :prefix-icon="useRenderIcon('ic:outline-email')"
                  clearable
                  @keydown.enter="onLogin(ruleFormRef)"
                >
                  <template v-slot:append>
                    <el-link
                      v-if="sendSecond === 60"
                      :underline="false"
                      class="px-2"
                      type="primary"
                      @click="onSendEmailCode"
                    >
                      {{ t("login.getEmailCode") }}
                    </el-link>
                    <el-link
                      v-else
                      :underline="false"
                      class="px-2"
                      type="primary"
                    >
                      {{ sendSecond }}
                      {{ t("login.getCodeInfo") }}
                    </el-link>
                  </template>
                </el-input>
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-button
                :loading="loading"
                class="w-full mt-4"
                size="default"
                type="primary"
                @click="onLogin(ruleFormRef)"
              >
                {{ t("login.login") }}
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
