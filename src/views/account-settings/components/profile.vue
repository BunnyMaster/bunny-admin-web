<script lang="ts" setup>
import ReCropperPreview from '@/components/ReCropperPreview';
import { sexConstant } from '@/enums/baseConstant';
import { $t } from '@/plugins/i18n';
import { useAdminUserStore } from '@/store/system/adminUser';
import { message } from '@/utils/message';
import { rules } from '@/views/account-settings/utils/columns';
import uploadLine from '~icons/ri/upload-line';
import { createFormData, deviceDetection } from '@pureadmin/utils';
import type { FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/system/user';
import { uploadImage } from '@/api/v1/system/system';
import { storeToRefs } from 'pinia';

const adminUserStore = useAdminUserStore();

const userStore = useUserStore();
const { userinfoForm } = storeToRefs(userStore);
// 用户表单Ref
const userInfoFormRef = ref<FormInstance>();
// 上传图片Ref
const uploadRef = ref();
// 剪裁头像Ref
const cropRef = ref();
// 剪裁完成后头像地址，base64内容
const imgBase64Src = ref('');
// 剪裁头像是否显示
const isShow = ref(false);
// 剪裁完成后头像数据
const cropperBlob = ref();
// 上传地址路径
const uploadAvatarSrc = ref();

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

/** 获取用户信息内容 */
const onSearchByUserinfo = async () => {
  const data = await userStore.loadUserinfo();
  userinfoForm.value.summary = data.personDescription;
  userinfoForm.value.avatar = data.avatar;
  userinfoForm.value.username = data.username;
  userinfoForm.value.nickname = data.nickname;
  userinfoForm.value.email = data.email;
  userinfoForm.value.phone = data.phone;
  userinfoForm.value.nickname = data.nickname;
  userinfoForm.value.password = data.password;
  userinfoForm.value.sex = data.sex;
};

/** 修改头像 */
const handleSubmitImage = async () => {
  // 上传头像表单
  const formData = createFormData({
    files: new File([cropperBlob.value], 'avatar'),
    type: 'avatar',
  });

  // 上传头像
  const result = await uploadImage(formData);

  // 上传成功后关闭弹窗
  if (result.code === 200) {
    uploadAvatarSrc.value = result.data.url;
    userinfoForm.value.avatar = result.data.thUrl;
    message($t('upload_success'), { type: 'success' });
    isShow.value = false;
  }
};

/** 提交表单 */
const onSubmit = async (formEl: FormInstance) => {
  await formEl.validate(async (valid) => {
    if (valid) {
      // 如果用户修改了头像，将上传的路径赋值进去
      const avatar = uploadAvatarSrc.value;
      if (avatar) userinfoForm.value.avatar = avatar;

      // 更新用户信息
      const result = await adminUserStore.editUserinfo(userinfoForm.value);
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
    <el-form ref="userInfoFormRef" :model="userinfoForm" :rules="rules" label-position="top">
      <el-form-item :label="$t('avatar')">
        <el-avatar :size="80" :src="userinfoForm.avatar" />
        <el-upload ref="uploadRef" :auto-upload="false" :limit="1" :on-change="onChange" :show-file-list="false" accept="image/*">
          <el-button class="ml-4" plain>
            <IconifyIconOffline :icon="uploadLine" />
            <span class="ml-2">{{ $t('upload_avatar') }}</span>
          </el-button>
          <template #tip>
            <div class="el-upload__tip">
              <el-text type="danger">{{ $t('upload_user_avatar_tip') }}</el-text>
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <!-- 用户名 -->
      <el-form-item :label="$t('adminUser_username')" prop="username">
        <el-input v-model="userinfoForm.username" :placeholder="$t('adminUser_username')" autocomplete="off" disabled type="text" />
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item :label="$t('adminUser_nickname')" prop="nickname">
        <el-input v-model="userinfoForm.nickname" :placeholder="$t('adminUser_nickname')" autocomplete="off" type="text" />
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item :label="$t('adminUser_email')" prop="email">
        <el-input v-model="userinfoForm.email" :placeholder="$t('adminUser_email')" autocomplete="off" type="text" />
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item :label="$t('adminUser_phone')" prop="phone">
        <el-input v-model="userinfoForm.phone" :placeholder="$t('adminUser_phone')" autocomplete="off" type="text" />
      </el-form-item>

      <!-- 性别 -->
      <el-form-item :label="$t('adminUser_sex')" prop="sex">
        <el-select v-model="userinfoForm.sex" :placeholder="$t('adminUser_sex')" clearable filterable>
          <el-option v-for="(item, index) in sexConstant" :key="index" :label="item.label" :navigationBar="false" :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- 用户简介 -->
      <el-form-item :label="$t('adminUser_summary')" prop="summary">
        <el-input
          v-model="userinfoForm.summary"
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
