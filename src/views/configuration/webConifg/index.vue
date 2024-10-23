<script lang="ts" setup>
import { rules } from '@/views/configuration/menuIcon/utils/columns';
import { $t } from '@/plugins/i18n';
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import ReCol from '@/components/MyCol';
import { form, onSearch } from '@/views/configuration/webConifg/utils/hooks';

const formRef = ref<FormInstance>();

onMounted(() => {
	onSearch();
});
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" class="bg-white p-[30px]" label-width="auto">
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
					<el-switch v-model="form.fixedHeader" :placeholder="$t('input') + $t('fixedHeader')" />
				</el-form-item>
			</re-col>

			<!-- 侧边栏是否隐藏 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('hiddenSideBar')" prop="hiddenSideBar">
					<el-switch v-model="form.hiddenSideBar" :placeholder="$t('input') + $t('hiddenSideBar')" />
				</el-form-item>
			</re-col>

			<!-- 是否缓存多个标签 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('multiTagsCache')" prop="multiTagsCache">
					<el-switch v-model="form.multiTagsCache" :placeholder="$t('input') + $t('multiTagsCache')" />
				</el-form-item>
			</re-col>

			<!-- 是否持久化 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('keepAlive')" prop="keepAlive">
					<el-switch v-model="form.keepAlive" :placeholder="$t('input') + $t('keepAlive')" />
				</el-form-item>
			</re-col>

			<!-- 语言类型 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('appLocale')" prop="locale">
					<el-input v-model="form.locale" :placeholder="$t('input') + $t('appLocale')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 应用程序的布局 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('layout')" prop="layout">
					<el-input v-model="form.layout" :placeholder="$t('input') + $t('layout')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 应用程序的主题 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('theme')" prop="theme">
					<el-input v-model="form.theme" :placeholder="$t('input') + $t('theme')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 是否启用深色模式 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('darkMode')" prop="darkMode">
					<el-switch v-model="form.darkMode" :placeholder="$t('input') + $t('darkMode')" />
				</el-form-item>
			</re-col>

			<!-- 应用程序的整体样式 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('overallStyle')" prop="overallStyle">
					<el-input v-model="form.overallStyle" :placeholder="$t('input') + $t('overallStyle')" autocomplete="off" type="text" />
				</el-form-item>
			</re-col>

			<!-- 是否启用灰色模式 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('greyStyle')" prop="grey">
					<el-switch v-model="form.grey" :placeholder="$t('input') + $t('greyStyle')" />
				</el-form-item>
			</re-col>

			<!-- 色弱模式 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('weakStyle')" prop="weak">
					<el-switch v-model="form.weak" :placeholder="$t('input') + $t('weakStyle')" />
				</el-form-item>
			</re-col>

			<!-- 是否隐藏选项卡 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('hideTabs')" prop="weak">
					<el-switch v-model="form.hideTabs" :placeholder="$t('input') + $t('hideTabs')" />
				</el-form-item>
			</re-col>

			<!-- 是否隐藏页脚 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('hideFooter')" prop="weak">
					<el-switch v-model="form.hideFooter" :placeholder="$t('input') + $t('hideFooter')" />
				</el-form-item>
			</re-col>

			<!-- 是否拉伸显示 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('stretch')" prop="stretch">
					<el-switch v-model="form.stretch" :placeholder="$t('input') + $t('stretch')" />
				</el-form-item>
			</re-col>

			<!-- 侧边栏的状态 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('sidebarStatus')" prop="sidebarStatus">
					<el-switch v-model="form.sidebarStatus" :placeholder="$t('input') + $t('sidebarStatus')" />
				</el-form-item>
			</re-col>

			<!-- 主题颜色 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('epThemeColor')" prop="epThemeColor">
					<el-switch v-model="form.epThemeColor" :placeholder="$t('input') + $t('epThemeColor')" />
				</el-form-item>
			</re-col>

			<!-- 是否显示logo -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('showLogo')" prop="showLogo">
					<el-switch v-model="form.showLogo" :placeholder="$t('input') + $t('showLogo')" />
				</el-form-item>
			</re-col>

			<!-- 要显示的模型 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('showModel')" prop="showModel">
					<el-switch v-model="form.showModel" :placeholder="$t('input') + $t('showModel')" />
				</el-form-item>
			</re-col>

			<!-- 菜单箭头图标是否没有过渡效果 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('menuArrowIconNoTransition')" prop="menuArrowIconNoTransition">
					<el-switch v-model="form.menuArrowIconNoTransition" :placeholder="$t('input') + $t('menuArrowIconNoTransition')" />
				</el-form-item>
			</re-col>

			<!-- 是否缓存异步路由 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('cachingAsyncRoutes')" prop="cachingAsyncRoutes">
					<el-switch v-model="form.cachingAsyncRoutes" :placeholder="$t('input') + $t('cachingAsyncRoutes')" />
				</el-form-item>
			</re-col>

			<!-- 工具提示的效果 -->
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item :label="$t('tooltipEffect')" prop="tooltipEffect">
					<el-input v-model="form.tooltipEffect" :placeholder="$t('input') + $t('tooltipEffect')" autocomplete="off" type="text" />
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
					<el-input v-model="form.menuSearchHistory" :placeholder="$t('input') + $t('menuSearchHistory')" autocomplete="off" type="number" />
				</el-form-item>
			</re-col>
		</el-row>
	</el-form>
</template>

<style lang="scss" scoped></style>
