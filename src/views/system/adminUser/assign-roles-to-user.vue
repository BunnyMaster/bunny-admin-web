<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoleStore } from '@/store/system/role';
import { useUserStore } from '@/store/system/user';

const props = defineProps({
	userId: { type: String as PropType<String> },
});

const roleStore = useRoleStore();
const userStore = useUserStore();
// 分配的角色
const assignRoles = ref([]);

/**
 * * 根据用户id获取当前用户角色
 */
const getRoleListByUserId = async () => {
	// 初始化值为空数组
	assignRoles.value = [];

	// 根据用户id查询角色信息
	const userId = props.userId;
	assignRoles.value = await userStore.getRoleListByUserId({ userId });
};

onMounted(() => {
	roleStore.getAllRoles();
	getRoleListByUserId();
});

defineExpose({ assignRoles });
</script>

<template>
	<div class="flex justify-center">
		<el-transfer
			v-model="assignRoles"
			:button-texts="['收回', '添加']"
			:data="roleStore.allRoleList"
			:format="{ noChecked: '总数 ${total}', hasChecked: '${checked}/${total}' }"
			:titles="['未添加', '已添加']"
			class="m-3"
			filter-placeholder="搜索角色"
			filterable
		/>
	</div>
</template>
