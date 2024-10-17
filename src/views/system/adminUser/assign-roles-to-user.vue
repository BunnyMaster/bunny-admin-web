<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoleStore } from '@/store/system/role';
import { useUserStore } from '@/store/system/user';
import { $t } from '@/plugins/i18n';

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
			:button-texts="[$t('take_back'), $t('add')]"
			:data="roleStore.allRoleList"
			:filter-placeholder="$t('Searching_for_roles')"
			:format="{ noChecked: `${$t('total')} $\{total}`, hasChecked: '${checked}/${total}' }"
			:titles="[$t('not_added'), $t('added')]"
			class="m-3"
			filterable
		/>
	</div>
</template>
