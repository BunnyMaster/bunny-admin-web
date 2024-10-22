<script lang="ts" setup>
import { useNav } from '@/layout/hooks/useNav';
import LogoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line';
import { $t } from '@/plugins/i18n';
import { useRouter } from 'vue-router';

const { logout, username, userAvatar, avatarsStyle } = useNav();
const router = useRouter();
</script>

<template>
	<el-dropdown trigger="click">
		<span class="el-dropdown-link navbar-bg-hover select-none">
			<img :src="userAvatar" :style="avatarsStyle" alt="" />
			<p v-if="username" class="dark:text-white">{{ username }}</p>
		</span>
		<template #dropdown>
			<el-dropdown-item @click="router.push({ name: 'AccountSettings' })">
				<IconifyIconOffline :icon="LogoutCircleRLine" style="margin: 5px" />
				账户设置
				<!--{{ $t('buttons.pureLoginOut') }}-->
			</el-dropdown-item>
			<el-dropdown-menu class="logout">
				<el-dropdown-item @click="logout">
					<IconifyIconOffline :icon="LogoutCircleRLine" style="margin: 5px" />
					{{ $t('buttons.pureLoginOut') }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown-link {
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 48px;
	padding: 10px;
	color: #000000d9;
	cursor: pointer;

	p {
		font-size: 14px;
	}

	img {
		width: 22px;
		height: 22px;
		border-radius: 50%;
	}
}
</style>
