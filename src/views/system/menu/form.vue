<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ReCol from '@/components/MyCol';
import { formRules } from '@/views/system/menu/utils/rule';
import { FormProps } from '@/views/system/menu/utils/types';
import { IconSelect } from '@/components/ReIcon';
import Segmented from '@/components/ReSegmented';
import ReAnimateSelector from '@/components/AnimateSelector';
import { fixedTagOptions, frameLoadingOptions, hiddenTagOptions, keepAliveOptions, menuTypeOptions, showLinkOptions, showParentOptions } from '@/enums';
import { $t } from '@/plugins/i18n';
import { userMenuIconStore } from '@/store/modules/menuIcon';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		menuType: 0,
		higherMenuOptions: [],
		parentId: 0,
		title: '',
		name: '',
		path: '',
		component: '',
		rank: 99,
		redirect: '',
		icon: '',
		enterTransition: '',
		leaveTransition: '',
		frameSrc: '',
		frameLoading: true,
		keepAlive: false,
		hiddenTag: false,
		fixedTag: false,
		showLink: true,
		showParent: false,
	}),
});

const menuIconStore = userMenuIconStore();
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

onMounted(() => {
	menuIconStore.getMenuIconList();
});

defineExpose({ menuFormRef: ruleFormRef });
</script>

<template>
	<el-form ref="ruleFormRef" :model="newFormInline" :rules="formRules" label-width="82px">
		<el-row :gutter="30">
			<re-col>
				<el-form-item label="菜单类型">
					<Segmented v-model="newFormInline.menuType" :options="menuTypeOptions" />
				</el-form-item>
			</re-col>

			<re-col>
				<el-form-item label="上级菜单">
					<el-cascader
						v-model="newFormInline.parentId"
						:options="newFormInline.higherMenuOptions"
						:props="{ value: 'id', label: 'title', emitPath: false, checkStrictly: true }"
						class="w-full"
						clearable
						filterable
						placeholder="请选择上级菜单"
					>
						<template #default="{ node, data }">
							<span>{{ $t(data.title) }}</span>
							<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
						</template>
					</el-cascader>
				</el-form-item>
			</re-col>

			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="newFormInline.title" clearable placeholder="请输入菜单名称" />
				</el-form-item>
			</re-col>
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="路由名称" prop="name">
					<el-input v-model="newFormInline.name" clearable placeholder="请输入路由名称" />
				</el-form-item>
			</re-col>

			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="路由路径" prop="path">
					<el-input v-model="newFormInline.path" clearable placeholder="请输入路由路径" />
				</el-form-item>
			</re-col>
			<re-col v-show="newFormInline.menuType === 0" :sm="24" :value="12" :xs="24">
				<el-form-item label="组件路径">
					<el-input v-model="newFormInline.component" clearable placeholder="请输入组件路径" />
				</el-form-item>
			</re-col>

			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="菜单排序">
					<el-input-number v-model="newFormInline.rank" :max="9999" :min="1" class="!w-full" controls-position="right" />
				</el-form-item>
			</re-col>
			<re-col v-show="newFormInline.menuType === 0" :sm="24" :value="12" :xs="24">
				<el-form-item label="路由重定向">
					<el-input v-model="newFormInline.redirect" clearable placeholder="请输入默认跳转地址" />
				</el-form-item>
			</re-col>

			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="菜单图标">
					<IconSelect v-model="newFormInline.icon" class="w-full" />
				</el-form-item>
			</re-col>

			<re-col v-show="newFormInline.menuType < 2" :sm="24" :value="12" :xs="24">
				<el-form-item label="进场动画">
					<ReAnimateSelector v-model="newFormInline.enterTransition" placeholder="请选择页面进场加载动画" />
				</el-form-item>
			</re-col>
			<re-col v-show="newFormInline.menuType < 2" :sm="24" :value="12" :xs="24">
				<el-form-item label="离场动画">
					<ReAnimateSelector v-model="newFormInline.leaveTransition" placeholder="请选择页面离场加载动画" />
				</el-form-item>
			</re-col>

			<re-col v-show="newFormInline.menuType === 1" :sm="24" :value="12" :xs="24">
				<!-- iframe -->
				<el-form-item label="链接地址">
					<el-input v-model="newFormInline.frameSrc" clearable placeholder="请输入 iframe 链接地址" />
				</el-form-item>
			</re-col>
			<re-col v-if="newFormInline.menuType === 1" :sm="24" :value="12" :xs="24">
				<el-form-item label="加载动画">
					<Segmented :modelValue="newFormInline.frameLoading ? 0 : 1" :options="frameLoadingOptions" @change="({ option: { value } }) => (newFormInline.frameLoading = value)" />
				</el-form-item>
			</re-col>

			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="菜单">
					<Segmented :modelValue="newFormInline.showLink ? 0 : 1" :options="showLinkOptions" @change="({ option: { value } }) => (newFormInline.showLink = value)" />
				</el-form-item>
			</re-col>
			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="父级菜单">
					<Segmented :modelValue="newFormInline.showParent ? 0 : 1" :options="showParentOptions" @change="({ option: { value } }) => (newFormInline.showParent = value)" />
				</el-form-item>
			</re-col>

			<re-col v-show="newFormInline.menuType < 2" :sm="24" :value="12" :xs="24">
				<el-form-item label="缓存页面">
					<Segmented :modelValue="newFormInline.keepAlive ? 0 : 1" :options="keepAliveOptions" @change="({ option: { value } }) => (newFormInline.keepAlive = value)" />
				</el-form-item>
			</re-col>

			<re-col v-show="newFormInline.menuType < 2" :sm="24" :value="12" :xs="24">
				<el-form-item label="标签页">
					<Segmented :modelValue="newFormInline.hiddenTag ? 1 : 0" :options="hiddenTagOptions" @change="({ option: { value } }) => (newFormInline.hiddenTag = value)" />
				</el-form-item>
			</re-col>
			<re-col v-show="newFormInline.menuType < 2" :sm="24" :value="12" :xs="24">
				<el-form-item label="固定标签页">
					<Segmented :modelValue="newFormInline.fixedTag ? 0 : 1" :options="fixedTagOptions" @change="({ option: { value } }) => (newFormInline.fixedTag = value)" />
				</el-form-item>
			</re-col>
		</el-row>
	</el-form>
</template>
