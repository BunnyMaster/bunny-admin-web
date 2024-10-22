import { useUserStore } from '@/store/system/user';
import { reactive } from 'vue';

const userStore = useUserStore();
export const userInfos = reactive({
	avatar: '',
	username: '',
	nickname: '',
	email: '',
	phone: '',
	description: '',
});

export const onSearch = async () => {
	const data = await userStore.getUserinfo();
	Object.assign(userInfos, data);
	userInfos.description = data.personDescription;
};
