import { reactive, ref } from 'vue';
import type { UploadRawFile, UploadRequestOptions } from 'element-plus';
import { SystemEnum } from '@/enums/upload';
import { message } from '@/utils/message';
import { fetchUploadFile } from '@/api/v1/system/system';
import { useAdminUserStore } from '@/store/system/adminUser';

// 用户信息列表
export const userDataList = ref();
// 搜索用户加载
export const loading = ref(false);
// 封面url
export const coverUrl = ref('');
// 提交表单信息
export const formState = reactive({
	title: '',
	receivedUserIds: undefined,
	messageTypeId: undefined,
	content: '',
	editorType: 'markdown',
	status: false,
	summary: '',
	level: '',
	extra: '',
	cover: '',
});
const adminUserStore = useAdminUserStore();

/** 搜索 */
export const onSearchUserinfo = async (keyword: string) => {
	loading.value = true;
	userDataList.value = await adminUserStore.queryUser({ keyword });
	loading.value = false;
};

/** 上传时 */
export const onUpload = async (options: UploadRequestOptions) => {
	const data = { file: options.file, type: 'message' };
	const result: any = await fetchUploadFile(data);
	coverUrl.value = result.data.url;
	formState.cover = result.data.filepath;
};

/** 上传之前 */
export const beforeUpload = (file: UploadRawFile) => {
	if (file.size > SystemEnum.IMAGE_SIZE) {
		message(SystemEnum.IMAGE_MESSAGE, { type: 'error' });
		return false;
	}
};
