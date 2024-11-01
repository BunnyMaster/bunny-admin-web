<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { deviceDetection, useGlobal } from '@pureadmin/utils';
import { useDataThemeChange } from '@/layout/hooks/useDataThemeChange';
import leftLine from '@iconify-icons/ri/arrow-left-s-line';
import { $t } from '@/plugins/i18n';
import { useMessageTypeStore } from '@/store/message/messageType';

const router = useRouter();
const isOpen = ref(!deviceDetection());
const { $storage } = useGlobal<GlobalPropertiesApi>();
const witchPane = ref('profile');
const messageTypeStore = useMessageTypeStore();
const route = useRoute();
const routerMessageType = ref('');

/** 点击菜单时 */
const onMenuClick = (item: any) => {
	const messageType = item.messageType;
	const messageId = item.messageId;
	routerMessageType.value = messageType;
	router.push({ path: `/message-detail/${item.messageType}` });
};

onBeforeMount(() => {
	messageTypeStore.getAllMessageTypeList();
	routerMessageType.value = route.params.messageType as string;
	useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
});
</script>

<template>
	<el-container class="h-full">
		<el-aside
			v-if="isOpen"
			:width="deviceDetection() ? '180px' : '240px'"
			class="pure-account-settings overflow-hidden px-2 dark:!bg-[var(--el-bg-color)] border-r-[1px] border-[var(--pure-border-color)]"
		>
			<el-menu :default-active="witchPane" class="pure-account-settings-menu">
				<!--<el-menu-item class="hover:!transition-all hover:!duration-200 hover:!text-base !h-[50px]" @click="router.go(-1)">-->
				<el-menu-item class="hover:!transition-all hover:!duration-200 hover:!text-base !h-[50px]" @click="router.push('/')">
					<div class="flex items-center">
						<IconifyIconOffline :icon="leftLine" />
						<span class="ml-2">{{ $t('back') }}</span>
					</div>
				</el-menu-item>
				<el-menu-item v-for="item in messageTypeStore.allMessageTypeList" :key="item.id" :class="routerMessageType === item.messageType ? 'is-active' : ''" :index="item.id" @click="onMenuClick(item)">
					<div class="flex items-center z-10">
						<span>{{ item.messageName }}</span>
					</div>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-main>
			<RouterView />
		</el-main>
	</el-container>
</template>

<style lang="scss">
.pure-account-settings {
	background: $menuBg;
}

.pure-account-settings-menu {
	background-color: transparent;
	border: none;

	.el-menu-item {
		height: 48px !important;
		color: $menuText;
		background-color: transparent !important;
		transition: color 0.2s;

		&:hover {
			color: $menuTitleHover !important;
		}

		&.is-active {
			color: #fff !important;

			&:hover {
				color: #fff !important;
			}

			&::before {
				position: absolute;
				inset: 0 8px;
				margin: 4px 0;
				clear: both;
				content: '';
				background: var(--el-color-primary);
				border-radius: 3px;
			}
		}
	}
}
</style>

<style lang="scss" scoped>
body[layout] {
	.el-menu--vertical .is-active {
		color: #fff !important;
		transition: color 0.2s;

		&:hover {
			color: #fff !important;
		}
	}
}
</style>
