<script lang="ts" setup>
import { $t } from '@/plugins/i18n';

defineProps({
	status: {
		type: Boolean,
	},
});
</script>

<template>
	<el-tag v-show="!status" effect="dark" size="large" type="success">{{ $t('status.enable') }}</el-tag>
	<el-tag v-show="status" effect="dark" size="large" type="danger">{{ $t('status.disable') }}</el-tag>
</template>
