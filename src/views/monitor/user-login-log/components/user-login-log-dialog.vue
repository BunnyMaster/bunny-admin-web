<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, rules } from '@/views/monitor/user-login-log/utils';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    // 用户Id
    userId: undefined,
    // 用户名
    username: undefined,
    // 登录token
    token: undefined,
    // 登录Ip
    ipAddress: undefined,
    // 登录Ip归属地
    ipRegion: undefined,
    // 登录时代理
    userAgent: undefined,
    // 操作类型
    type: undefined,
    // 标识客户端是否是通过Ajax发送请求的
    xRequestedWith: undefined,
    // 客户端连接到服务器的近似带宽
    downlink: undefined,
  }),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <!-- 用户Id -->
    <el-form-item :label="$t('userLoginLog_userId')" prop="userId">
      <el-input
        v-model="form.userId"
        :placeholder="$t('input') + $t('userLoginLog_userId')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>

    <!-- 用户名 -->
    <el-form-item :label="$t('userLoginLog_username')" prop="username">
      <el-input
        v-model="form.username"
        :placeholder="$t('input') + $t('userLoginLog_username')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>

    <!-- 登录token -->
    <el-form-item :label="$t('userLoginLog_token')" prop="token">
      <el-input
        v-model="form.token"
        :autosize="{ minRows: 2, maxRows: 8 }"
        :placeholder="$t('input') + $t('userLoginLog_token')"
        autocomplete="off"
        type="textarea"
      />
    </el-form-item>

    <!-- 登录Ip -->
    <el-form-item :label="$t('userLoginLog_ipAddress')" prop="ipAddress">
      <el-input
        v-model="form.ipAddress"
        :placeholder="$t('input') + $t('userLoginLog_ipAddress')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>

    <!-- 登录Ip归属地 -->
    <el-form-item :label="$t('userLoginLog_ipRegion')" prop="ipRegion">
      <el-input
        v-model="form.ipRegion"
        :placeholder="$t('input') + $t('userLoginLog_ipRegion')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>

    <!-- 登录时代理 -->
    <el-form-item :label="$t('userLoginLog_userAgent')" prop="userAgent">
      <el-input
        v-model="form.userAgent"
        :autosize="{ minRows: 2, maxRows: 8 }"
        :placeholder="$t('input') + $t('userLoginLog_userAgent')"
        autocomplete="off"
        type="textarea"
      />
    </el-form-item>

    <!-- 操作类型 -->
    <el-form-item :label="$t('userLoginLog_type')" prop="type">
      <el-input
        v-model="form.type"
        :placeholder="$t('input') + $t('userLoginLog_type')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>

    <!-- 标识客户端是否是通过Ajax发送请求的 -->
    <el-form-item :label="$t('userLoginLog_xRequestedWith')" prop="xRequestedWith">
      <el-input
        v-model="form.xRequestedWith"
        :placeholder="$t('input') + $t('userLoginLog_xRequestedWith')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>
  </el-form>
</template>
