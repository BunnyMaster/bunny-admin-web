<script lang="ts" setup>
import { computed, PropType } from 'vue';
import shopIcon from '@/assets/svg/shop.svg?component';
import laptopIcon from '@/assets/svg/laptop.svg?component';
import serviceIcon from '@/assets/svg/service.svg?component';
import calendarIcon from '@/assets/svg/calendar.svg?component';
import userAvatarIcon from '@/assets/svg/user_avatar.svg?component';

interface CardProductType {
	type: string;
	key: string;
	status: boolean;
	details: any;
}

const props = defineProps({
	product: {
		type: Object as PropType<CardProductType>,
	},
});
const cardClass = computed(() => ['list-card-item', { 'list-card-item__disabled': !props.product.status }]);
const cardLogoClass = computed(() => ['list-card-item_detail--logo', { 'list-card-item_detail--logo__disabled': !props.product.status }]);
</script>

<template>
	<div :class="cardClass">
		<div class="list-card-item_detail bg-bg_color">
			<el-row justify="space-between">
				<div :class="cardLogoClass">
					<shopIcon v-if="product.type === 'db'" />
					<calendarIcon v-if="product.type === 'redis'" />
					<serviceIcon v-if="product.type === 'ping'" />
					<userAvatarIcon v-if="product.type === 'minio'" />
					<laptopIcon v-if="product.type === 'diskSpace'" />
				</div>
				<div class="list-card-item_detail--operation">
					<el-tag :color="product.status ? '#00a870' : '#eee'" class="mx-1 list-card-item_detail--operation--tag" effect="dark">
						{{ product.status ? '已启用' : '已停用' }}
					</el-tag>
				</div>
			</el-row>
			<p class="list-card-item_detail--name text-text_color_primary">
				{{ product.key }}
			</p>
			<p v-for="(detail, index) in product.details" :key="index" class="list-card-item_detail--desc" style="margin-bottom: 0; height: 20px">{{ detail.key }} : {{ detail.value }}</p>
		</div>
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
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
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
