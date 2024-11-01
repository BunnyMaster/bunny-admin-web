<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { PlusCheckCardGroup } from 'plus-pro-components';
import 'plus-pro-components/es/components/check-card-group/style/css';

const route = useRoute();

/** 获取消息详情 */
const getMessageDetail = () => {
	const messageId = route.params.messageId;
};
const options = [
	{
		title: '标题一',
		value: '0',
		description: '坚持梦想，成就不凡的自己',
		avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
	},
	{
		title: '标题二',
		value: '1',
		description: '每一次努力，都是成长的契机',
		avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
	},
];
const size = ref('default');
const dynamicSize = ref();
const list = ref('0');
onMounted(() => {
	getMessageDetail();
});
</script>

<template>
	<PlusCheckCardGroup v-model="list" :disabled="size === 'disabled'" :options="options" :size="dynamicSize" />
</template>
