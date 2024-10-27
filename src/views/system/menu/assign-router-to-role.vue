<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoleStore } from '@/store/system/role';
import { userMenuStore } from '@/store/system/menu';
import { $t } from '@/plugins/i18n';

const props = defineProps({
	routerId: { type: String as PropType<String> },
	warning: { type: String as PropType<String> },
});

const roleStore = useRoleStore();
const menuStore = userMenuStore();
// 分配的角色
const assignRoles = ref([]);

/**
 * * 根据用户id获取当前用户角色
 */
const getRoleListByRouterId = async () => {
	// 初始化值为空数组
	assignRoles.value = [];

	// 根据用户id查询角色信息
	const routerId = props.routerId;
	if (routerId) {
		assignRoles.value = await menuStore.getRoleListByRouterId({ routerId });
	}
};

onMounted(() => {
	roleStore.getAllRoles();
	getRoleListByRouterId();
});

defineExpose({ assignRoles });
</script>

<template>
	<div class="flex flex-col items-center">
		<el-text v-show="warning" class="mx-1" type="danger">{{ warning }}</el-text>
		<el-transfer
			v-model="assignRoles"
			:button-texts="[$t('take_back'), $t('add')]"
			:data="roleStore.allRoleList"
			:filter-placeholder="$t('Searching_for_router')"
			:format="{ noChecked: `${$t('total')} $\{total}`, hasChecked: '${checked}/${total}' }"
			:titles="[$t('not_added'), $t('added')]"
			class="m-3"
			filterable
		/>
	</div>
</template>
