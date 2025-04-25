<script lang="ts" setup>
import ReCropperPreview from '@/components/CropperPreview';
import { sexConstant } from '@/enums/baseConstant';
import { $t } from '@/plugins/i18n';
import { useAdminUserStore } from '@/store/system/adminUser';
import { message } from '@/utils/message';
import {
  cropperBlob,
  handleSubmitImage,
  isShow,
  onSearchByUserinfo,
  rules,
  uploadAvatarSrc,
  userInfos,
} from '@/views/account-settings/utils';
import uploadLine from '@iconify-icons/ri/upload-line';
import { deviceDetection } from '@pureadmin/utils';
import type { FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';

const adminUserStore = useAdminUserStore();

// 用户表单Ref
const userInfoFormRef = ref<FormInstance>();
// 上传图片Ref
const uploadRef = ref();
// 剪裁头像Ref
const cropRef = ref();
// 剪裁完成后头像地址，base64内容
const imgBase64Src = ref('');

/** 关闭弹窗 */
const handleClose = () => {
  cropRef.value.hidePopover();
  uploadRef.value.clearFiles();
  isShow.value = false;
};

/** 剪裁头像 */
const onCropper = ({ blob }) => (cropperBlob.value = blob);

/** 头像修改内容 */
const onChange = (uploadFile: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imgBase64Src.value = e.target.result as string;
    isShow.value = true;
  };
  reader.readAsDataURL(uploadFile.raw);
};

/** 提交表单 */
const onSubmit = async (formEl: FormInstance) => {
  await formEl.validate(async (valid) => {
    if (valid) {
      // 如果用户修改了头像，将上传的路径赋值进去
      const avatar = uploadAvatarSrc.value;
      if (avatar) userInfos.avatar = avatar;

      // 更新用户信息
      const result = await adminUserStore.updateAdminUserByLocalUser(userInfos);
      if (!result) return;

      // 重新加载用户信息
      await onSearchByUserinfo();
    } else {
      message($t('required_fields'), { type: 'warning' });
    }
  });
};

onMounted(() => {
  onSearchByUserinfo();
});
</script>

<template>
  <div :class="['min-w-[180px]', deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]']">
    <h3 class="my-8">个人信息</h3>

    <!-- 头像 -->
    <el-form ref="userInfoFormRef" :model="userInfos" :rules="rules" label-position="top">
      <el-form-item :label="$t('avatar')">
        <el-avatar :size="80" :src="userInfos.avatar" />
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          :limit="1"
          :on-change="onChange"
          :show-file-list="false"
          accept="image/*"
        >
          <el-button class="ml-4" plain>
            <IconifyIconOffline :icon="uploadLine" />
            <span class="ml-2">{{ $t('upload_avatar') }}</span>
          </el-button>
          <template #tip>
            <div class="el-upload__tip text-red-600">{{ $t('upload_user_avatar_tip') }}</div>
          </template>
        </el-upload>
      </el-form-item>

      <!-- 用户名 -->
      <el-form-item :label="$t('adminUser_username')" prop="username">
        <el-input
          v-model="userInfos.username"
          :placeholder="$t('adminUser_username')"
          autocomplete="off"
          disabled
          type="text"
        />
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item :label="$t('adminUser_nickname')" prop="nickname">
        <el-input v-model="userInfos.nickname" :placeholder="$t('adminUser_nickname')" autocomplete="off" type="text" />
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item :label="$t('adminUser_email')" prop="email">
        <el-input v-model="userInfos.email" :placeholder="$t('adminUser_email')" autocomplete="off" type="text" />
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item :label="$t('adminUser_phone')" prop="phone">
        <el-input v-model="userInfos.phone" :placeholder="$t('adminUser_phone')" autocomplete="off" type="text" />
      </el-form-item>

      <!-- 性别 -->
      <el-form-item :label="$t('adminUser_sex')" prop="sex">
        <el-select v-model="userInfos.sex" :placeholder="$t('adminUser_sex')" clearable filterable>
          <el-option
            v-for="(item, index) in sexConstant"
            :key="index"
            :label="item.label"
            :navigationBar="false"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 用户简介 -->
      <el-form-item :label="$t('adminUser_summary')" prop="summary">
        <el-input
          v-model="userInfos.summary"
          :autosize="{ minRows: 3, maxRows: 6 }"
          :placeholder="$t('adminUser_summary')"
          autocomplete="off"
          maxlength="200"
          show-word-limit
          type="textarea"
        />
      </el-form-item>

      <!-- 更新信息 -->
      <el-button type="primary" @click="onSubmit(userInfoFormRef)">{{ $t('update_information') }}</el-button>
    </el-form>

    <el-dialog
      v-model="isShow"
      :before-close="handleClose"
      :closeOnClickModal="false"
      :fullscreen="deviceDetection()"
      destroy-on-close
      title="编辑头像"
      width="40%"
    >
      <ReCropperPreview ref="cropRef" :imgSrc="imgBase64Src" @cropper="onCropper" />
      <template #footer>
        <div class="dialog-footer">
          <el-button bg text @click="handleClose">取消</el-button>
          <el-button bg text type="primary" @click="handleSubmitImage">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
