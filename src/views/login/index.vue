<script lang="ts" setup>
import Motion from './utils/motion';
import { useNav } from '@/layout/hooks/useNav';
import { useLayout } from '@/layout/hooks/useLayout';
import { avatar, bg, illustration } from './utils/static';
import { toRaw } from 'vue';
import { useTranslationLang } from '@/layout/hooks/useTranslationLang';
import { useDataThemeChange } from '@/layout/hooks/useDataThemeChange';

import dayIcon from '@/assets/svg/day.svg?component';
import darkIcon from '@/assets/svg/dark.svg?component';
import globalization from '@/assets/svg/globalization.svg?component';
import Check from '@iconify-icons/ep/check';

import LoginForm from '@/views/login/login-form.vue';

defineOptions({
	name: 'Login',
});

const { initStorage } = useLayout();
initStorage();

const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();
</script>

<template>
	<div class="select-none">
		<img :src="bg" alt="" class="wave" />
		<div class="flex-c absolute right-5 top-3">
			<!-- 主题 -->
			<el-switch v-model="dataTheme" :active-icon="dayIcon" :inactive-icon="darkIcon" inline-prompt @change="dataThemeChange" />

			<!-- 国际化 -->
			<el-dropdown trigger="click">
				<globalization class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300" />
				<template #dropdown>
					<el-dropdown-menu class="translation">
						<el-dropdown-item :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]" :style="getDropdownItemStyle(locale, 'zh')" @click="translationCh">
							<IconifyIconOffline v-show="locale === 'zh'" :icon="Check" class="check-zh" />
							简体中文
						</el-dropdown-item>
						<el-dropdown-item :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]" :style="getDropdownItemStyle(locale, 'en')" @click="translationEn">
							<span v-show="locale === 'en'" class="check-en">
								<IconifyIconOffline :icon="Check" />
							</span>
							English
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<div class="login-container">
			<div class="img">
				<component :is="toRaw(illustration)" />
			</div>
			<div class="login-box">
				<div class="login-form">
					<avatar class="avatar" />
					<Motion>
						<h2 class="outline-none">{{ title }}</h2>
					</Motion>

					<!-- 登录表单 -->
					<login-form />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url('@/style/login.css');
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
	padding: 0;
}

.translation {
	::v-deep(.el-dropdown-menu__item) {
		padding: 5px 40px;
	}

	.check-zh {
		position: absolute;
		left: 20px;
	}

	.check-en {
		position: absolute;
		left: 20px;
	}
}
</style>
