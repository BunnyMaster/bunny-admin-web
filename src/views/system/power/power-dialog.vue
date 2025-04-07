<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, powerCascadeProps, rules } from '@/views/system/power/utils';
import { $t } from '@/plugins/i18n';
import { handleTree } from '@pureadmin/utils';
import { usePowerStore } from '@/store/system/power';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 父级id
		parentId: undefined,
		// 权限编码
		powerCode: undefined,
		// 权限名称
		powerName: undefined,
		// 请求路径
		requestUrl: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);
const powerStore = usePowerStore();

onMounted(() => {
	powerStore.getAllPowers();
});

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('power_parentId')" prop="parentId">
			<el-cascader v-model="form.parentId" :options="handleTree(powerStore.allPowerList)" :props="powerCascadeProps" class="w-full" clearable filterable show-all-levels />
		</el-form-item>
		<el-form-item :label="$t('power_powerCode')" prop="powerCode">
			<el-input v-model="form.powerCode" :placeholder="$t('power_powerCode')" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('power_powerName')" prop="powerName">
			<el-input v-model="form.powerName" :placeholder="$t('power_powerName')" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('power_requestUrl')" prop="requestUrl">
			<el-input v-model="form.requestUrl" :placeholder="$t('inputRequestUrlTip')" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
