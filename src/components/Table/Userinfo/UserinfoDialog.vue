<script lang="ts" setup>
import userAvatarIcon from '@/assets/svg/user_avatar.svg?component';
import { columns } from './columns';
import TablePlus from '@/components/TableBar/src/TablePlus.vue';
import { onMounted, ref } from 'vue';
import { fetchGetUserinfoById } from '@/api/v1/adminUser';
import { $t } from '@/plugins/i18n';

const props = defineProps({
	userId: { type: String as PropType<String> },
});
const userinfo = ref();
const loading = ref(false);

/**
 * * 获取用户信息
 */
const getUserInfo = async () => {
	// 如果没有传入用户ID直接返回
	if (!props.userId) return;
	loading.value = true;

	// 判断是否是web端
	const result = await fetchGetUserinfoById({ id: props.userId });
	if (result.code === 200) {
		userinfo.value = result.data;
	}

	loading.value = false;
};

onMounted(() => {
	getUserInfo();
});
</script>

<template>
	<div class="list-card-item">
		<div v-if="userId && userinfo" class="list-card-item_detail bg-bg_color">
			<el-row justify="space-between">
				<div class="list-card-item_detail--logo">
					<userAvatarIcon />
				</div>
				<el-tag :color="userinfo.status ? '#F67676' : '#00a870'" class="mx-1 list-card-item_detail--operation--tag" effect="dark">
					{{ $t('user_status') }}：{{ userinfo.status ? $t('disable') : $t('normal') }}
				</el-tag>
			</el-row>

			<p class="list-card-item_detail--name text-text_color_primary">{{ $t('user_details') }}</p>
			<TablePlus :column="columns" :data-list="[userinfo]" :loading="loading" />
		</div>
		<el-empty v-else description="无数据" />
	</div>
</template>

<style lang="scss" scoped>
.list-card-item {
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 3px;

	&_detail {
		flex: 1;
		min-height: 140px;
		padding: 24px 32px;

		&--logo {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 46px;
			height: 46px;
			font-size: 26px;
			color: #0052d9;
			background: #e0ebff;
			border-radius: 50%;

			&__disabled {
				color: #a1c4ff;
			}
		}

		&--operation {
			display: flex;
			height: 100%;

			&--tag {
				border: 0;
			}
		}

		&--name {
			margin: 24px 0 8px;
			font-size: 16px;
			font-weight: 400;
		}

		&--desc {
			display: -webkit-box;
			height: 40px;
			margin-bottom: 24px;
			overflow: hidden;
			font-size: 12px;
			line-height: 20px;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}

	&__disabled {
		.list-card-item_detail--name,
		.list-card-item_detail--desc {
			color: var(--el-text-color-disabled);
		}

		.list-card-item_detail--operation--tag {
			color: #bababa;
		}
	}
}
</style>
