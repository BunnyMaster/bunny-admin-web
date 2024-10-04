<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/system/menuIcon/utils/columns';
import { FormProps } from '@/views/system/menuIcon/utils/types';
import { $t } from '@/plugins/i18n';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';

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
		<el-form-item :label="$t('menuIcon_iconName')" prop="iconName">
			<el-input v-model="form.iconName" autocomplete="off" type="text" />
		</el-form-item>

		<el-form-item v-show="form.iconName" :label="$t('menuIcon_preview')">
			<div class="flex justify-center">
				<component :is="useRenderIcon(form.iconName)" class="flex justify-center" style="font-size: 30px" />
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
