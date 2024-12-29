<script lang="ts" setup>
import { $t } from '@/plugins/i18n';
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import ReCol from '@/components/MyCol';
import { form, onSearch, submitForm } from '@/views/configuration/webConifg/utils/hooks';
import { rules } from '@/views/configuration/webConifg/utils/columns';
import { userI18nTypeStore } from '@/store/i18n/i18nType';
import { usePublicHooks } from '@/views/hooks';
import { auth } from '@/views/configuration/webConifg/utils/auth';
import { hasAuth } from '@/router/utils';

const ruleFormRef = ref<FormInstance>();
const i18nTypeStore = userI18nTypeStore();
// 用户是否停用样式
const { switchStyle } = usePublicHooks();
const theme = ['dark', 'light', 'system'];
const layout = ['vertical', 'horizontal', 'mix'];

onMounted(() => {
	onSearch();
});
</script>

<template>
	<el-form ref="ruleFormRef" :model="form" :rules="rules" class="bg-white p-[30px] h-[100%]" label-position="left" label-width="auto" status-icon>
		<el-row :gutter="30">
			<!-- 应用程序的版本 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('version')" prop="version">
					<el-input v-model="form.version" :placeholder="$t('input') + $t('version')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 应用程序的标题 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('appTitle')" prop="title">
					<el-input v-model="form.title" :placeholder="$t('input') + $t('appTitle')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 版权信息 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('copyright')" prop="copyright">
					<el-input v-model="form.copyright" :placeholder="$t('input') + $t('copyright')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 头部是否固定 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('fixedHeader')" prop="fixedHeader">
					<el-switch v-model="form.fixedHeader" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 侧边栏是否隐藏 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('hiddenSideBar')" prop="hiddenSideBar">
					<el-switch v-model="form.hiddenSideBar" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 是否缓存多个标签 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('multiTagsCache')" prop="multiTagsCache">
					<el-switch v-model="form.multiTagsCache" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 是否持久化 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('keepAlive')" prop="keepAlive">
					<el-switch v-model="form.keepAlive" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 语言类型 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('appLocale')" prop="locale">
					<el-select v-model="form.locale" :placeholder="$t('select') + $t('appLocale')" filterable>
						<el-option v-for="item in i18nTypeStore.datalist" :key="item.id" :label="item.summary" :value="item.typeName" />
					</el-select>
				</el-form-item>
			</re-col>

			<!-- 应用程序的布局 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('layout')" prop="layout">
					<el-select v-model="form.layout" :placeholder="$t('select') + $t('layout')" filterable>
						<el-option v-for="item in layout" :key="item" :label="item" :value="item" />
					</el-select>
				</el-form-item>
			</re-col>

			<!-- 应用程序的主题 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('theme')" prop="theme">
					<el-select v-model="form.theme" :placeholder="$t('select') + $t('theme')" filterable>
						<el-option v-for="item in theme" :key="item" :label="item" :value="item" />
					</el-select>
				</el-form-item>
			</re-col>

			<!-- 是否启用深色模式 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('darkMode')" prop="darkMode">
					<el-switch v-model="form.darkMode" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 应用程序的整体样式 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('overallStyle')" prop="overallStyle">
					<el-select v-model="form.overallStyle" :placeholder="$t('select') + $t('overallStyle')" filterable>
						<el-option v-for="item in theme" :key="item" :label="item" :value="item" />
					</el-select>
				</el-form-item>
			</re-col>

			<!-- 是否启用灰色模式 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('greyStyle')" prop="grey">
					<el-switch v-model="form.grey" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 色弱模式 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('weakStyle')" prop="weak">
					<el-switch v-model="form.weak" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 是否隐藏选项卡 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('hideTabs')" prop="weak">
					<el-switch v-model="form.hideTabs" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 是否隐藏页脚 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('hideFooter')" prop="weak">
					<el-switch v-model="form.hideFooter" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 是否拉伸显示 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('stretch')" prop="stretch">
					<el-switch v-model="form.stretch" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 侧边栏的状态 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('sidebarStatus')" prop="sidebarStatus">
					<el-switch v-model="form.sidebarStatus" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 主题颜色 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('epThemeColor')" prop="epThemeColor">
					<el-color-picker v-model="form.epThemeColor" />
				</el-form-item>
			</re-col>

			<!-- 是否显示logo -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('showLogo')" prop="showLogo">
					<el-switch v-model="form.showLogo" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 要显示的模型 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('showModel')" prop="showModel">
					<el-input v-model="form.showModel" :placeholder="$t('input') + $t('showModel')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 菜单箭头图标是否没有过渡效果 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('menuArrowIconNoTransition')" prop="menuArrowIconNoTransition">
					<el-switch v-model="form.menuArrowIconNoTransition" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 是否缓存异步路由 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('cachingAsyncRoutes')" prop="cachingAsyncRoutes">
					<el-switch v-model="form.cachingAsyncRoutes" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
				</el-form-item>
			</re-col>

			<!-- 工具提示的效果 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('tooltipEffect')" prop="tooltipEffect">
					<el-select v-model="form.tooltipEffect" :placeholder="$t('select') + $t('tooltipEffect')" filterable>
						<el-option v-for="item in theme" :key="item" :label="item" :value="item" />
					</el-select>
				</el-form-item>
			</re-col>

			<!-- 响应式存储的命名空间 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('responsiveStorageNameSpace')" prop="responsiveStorageNameSpace">
					<el-input v-model="form.responsiveStorageNameSpace" :placeholder="$t('input') + $t('responsiveStorageNameSpace')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 菜单搜索历史 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('menuSearchHistory')" prop="menuSearchHistory">
					<el-input v-model="form.menuSearchHistory" :max="99" :min="1" :placeholder="$t('input') + $t('menuSearchHistory')" autocomplete="off" type="number" />
				</el-form-item>
			</re-col>

			<!-- 提交内容 -->
			<re-col v-if="hasAuth(auth.update)" :sm="24" :value="12" :xs="24">
				<el-form-item>
					<el-button type="primary" @click="submitForm(ruleFormRef)"> {{ $t('modifyingConfiguration') }}</el-button>
				</el-form-item>
			</re-col>
		</el-row>
	</el-form>
</template>
