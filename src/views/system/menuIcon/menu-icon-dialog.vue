<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/system/menuIcon/utils/columns';
import { FormProps } from '@/views/system/menuIcon/utils/types';
import { $t } from '@/plugins/i18n';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import MenuIconSelectIconName from '@/views/system/menuIcon/menu-icon-select-icon-name.vue';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// icon 名称
		iconName: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('menuIcon_iconCode')" prop="iconCode">
			<el-input v-model="form.iconCode" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('menuIcon_iconName')" prop="iconName">
			<MenuIconSelectIconName :form="form" />
		</el-form-item>

		<el-form-item v-show="form.iconCode" :label="$t('menuIcon_preview')">
			<div class="flex justify-center">
				<component :is="useRenderIcon(form.iconCode)" class="flex justify-center" style="font-size: 30px" />
			</div>
		</el-form-item>

		<!-- icon 官网 -->
		<el-form-item :label="$t('systemMenuIcon.officialWebsite')">
			<el-link :title="$t('systemMenuIcon.officialWebsite')" :underline="false" href="https://icon-sets.iconify.design/" target="_blank" type="primary">
				{{ $t('systemMenuIcon.officialWebsite') }}
			</el-link>
		</el-form-item>
	</el-form>
</template>
