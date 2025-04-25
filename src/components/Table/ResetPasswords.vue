<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { $t } from '@/plugins/i18n';
import { zxcvbn } from '@zxcvbn-ts/core';
import { isAllEmpty } from '@pureadmin/utils';
import { REGEXP_PWD } from '@/views/login/utils/rule';

const props = defineProps({
  form: {
    type: Object as PropType<any>,
  },
});

const rules = {
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      type: 'pattern',
      message: $t('login.purePassWordRuleReg'),
      trigger: ['change', 'blur'],
      pattern: REGEXP_PWD,
    },
  ],
};
const pwdProgress = [
  { color: '#e74242', text: '非常弱' },
  { color: '#EFBD47', text: '弱' },
  { color: '#ffa500', text: '一般' },
  { color: '#1bbf1b', text: '强' },
  { color: '#008000', text: '非常强' },
];

const ruleFormRef = ref();
// 当前密码强度（0-4）
const curScore = ref(-1);

/**
 * * 监听密码强度
 */
onMounted(() => {
  watch(
    () => props.form,
    ({ password }) => {
      curScore.value = isAllEmpty(password) ? -1 : zxcvbn(password).score;
    },
    { deep: true }
  );
});
defineExpose({ ruleFormRef });
</script>

<template>
  <div class="my-2">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item :label="$t('adminUser_password')" prop="password">
        <el-input
          v-model="form.password!"
          :placeholder="$t('adminUser_password')"
          clearable
          show-password
          type="password"
        />
      </el-form-item>
    </el-form>

    <div class="mt-4 flex">
      <div v-for="(item, index) in pwdProgress" :key="index" class="w-[19vw]">
        <div :style="{ marginLeft: index !== 0 ? '4px' : 0 }">
          <el-progress
            :color="item.color"
            :duration="curScore === index ? 6 : 0"
            :percentage="curScore >= index ? 100 : 0"
            :show-text="false"
            :stroke-width="10"
            striped
            striped-flow
          />
          <p :style="{ color: curScore === index ? item.color : '' }" class="text-center">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
