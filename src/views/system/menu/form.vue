<script lang="ts" setup>
import { ref } from 'vue';
import ReCol from '@/components/MyCol';
import { formRules } from '@/views/system/menu/utils/columns';
import IconSelect from '@/components/SelectIcon/Select.vue';
import Segmented from '@/components/Segmented';
import { menuTypeOptions } from '@/enums';
import { FormProps } from '@/views/system/menu/utils/types';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({}),
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
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
							<span>{{ data.title }}</span>
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
				<el-form-item v-model="newFormInline.rank" label="菜单排序" prop="rank">
					<el-input-number v-model="newFormInline.rank" :max="9999" :min="1" class="!w-full" controls-position="right" />
				</el-form-item>
			</re-col>

			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="菜单图标" prop="icon">
					<IconSelect :form-inline="newFormInline" class="w-full" />
				</el-form-item>
			</re-col>

			<re-col v-show="newFormInline.menuType === 1" :sm="24" :value="12" :xs="24">
				<el-form-item label="链接地址" prop="frameSrc">
					<el-input v-model="newFormInline.frameSrc" clearable placeholder="请输入 iframe 链接地址" />
				</el-form-item>
			</re-col>

			<re-col :sm="24" :value="12" :xs="24">
				<el-form-item label="是否显示">
					<el-switch v-model="newFormInline.visible" active-text="开启" inactive-text="隐藏" inline-prompt style="

--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
				</el-form-item>
			</re-col>
		</el-row>
	</el-form>
</template>
