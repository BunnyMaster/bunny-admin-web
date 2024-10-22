<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { message } from '@/utils/message';
import type { FormInstance } from 'element-plus';
import ReCropperPreview from '@/components/CropperPreview';
import { createFormData, deviceDetection } from '@pureadmin/utils';
import uploadLine from '@iconify-icons/ri/upload-line';
import { useUserStore } from '@/store/system/user';
import { rules } from '@/views/account-settings/utils/columns';
import { onSearch, userInfos } from '@/views/account-settings/utils/hooks';

const imgSrc = ref('');
const cropperBlob = ref();
const cropRef = ref();
const uploadRef = ref();
const isShow = ref(false);
const userInfoFormRef = ref<FormInstance>();
const userStore = useUserStore();

function queryEmail(queryString, callback) {
	const emailList = [{ value: '@qq.com' }, { value: '@126.com' }, { value: '@163.com' }];
	let results = [];
	let queryList = [];
	emailList.map(item => queryList.push({ value: queryString.split('@')[0] + item.value }));
	results = queryString ? queryList.filter(item => item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0) : queryList;
	callback(results);
}

const onChange = uploadFile => {
	const reader = new FileReader();
	reader.onload = e => {
		imgSrc.value = e.target.result as string;
		isShow.value = true;
	};
	reader.readAsDataURL(uploadFile.raw);
};

const handleClose = () => {
	cropRef.value.hidePopover();
	uploadRef.value.clearFiles();
	isShow.value = false;
};

const onCropper = ({ blob }) => (cropperBlob.value = blob);

const handleSubmitImage = () => {
	const formData = createFormData({
		files: new File([cropperBlob.value], 'avatar'),
	});
	// formUpload(formData)
	// 	.then(({ success, data }) => {
	// 		if (success) {
	// 			message('更新头像成功', { type: 'success' });
	// 			handleClose();
	// 		} else {
	// 			message('更新头像失败');
	// 		}
	// 	})
	// 	.catch(error => {
	// 		message(`提交异常 ${error}`, { type: 'error' });
	// 	});
};

// 更新信息
const onSubmit = async (formEl: FormInstance) => {
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log(userInfos);
			message('更新信息成功', { type: 'success' });
		} else {
			console.log('Error submit!', fields);
		}
	});
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div :class="['min-w-[180px]', deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]']">
		<h3 class="my-8">个人信息</h3>
		<el-form ref="userInfoFormRef" :model="userInfos" :rules="rules" label-position="top">
			<el-form-item label="头像">
				<el-avatar :size="80" :src="userInfos.avatar" />
				<el-upload ref="uploadRef" :auto-upload="false" :limit="1" :on-change="onChange" :show-file-list="false" accept="image/*" action="#">
					<el-button class="ml-4" plain>
						<IconifyIconOffline :icon="uploadLine" />
						<span class="ml-2">更新头像</span>
					</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="userInfos.nickname" placeholder="请输入昵称" />
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-autocomplete v-model="userInfos.email" :fetch-suggestions="queryEmail" :trigger-on-focus="false" class="w-full" clearable placeholder="请输入邮箱" />
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="userInfos.phone" clearable placeholder="请输入联系电话" />
			</el-form-item>
			<el-form-item label="简介">
				<el-input v-model="userInfos.description" :autosize="{ minRows: 6, maxRows: 8 }" maxlength="56" placeholder="请输入简介" show-word-limit type="textarea" />
			</el-form-item>
			<el-button type="primary" @click="onSubmit(userInfoFormRef)"> 更新信息</el-button>
		</el-form>
		<el-dialog v-model="isShow" :before-close="handleClose" :closeOnClickModal="false" :fullscreen="deviceDetection()" destroy-on-close title="编辑头像" width="40%">
			<ReCropperPreview ref="cropRef" :imgSrc="imgSrc" @cropper="onCropper" />
			<template #footer>
				<div class="dialog-footer">
					<el-button bg text @click="handleClose">取消</el-button>
					<el-button bg text type="primary" @click="handleSubmitImage"> 确定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>
