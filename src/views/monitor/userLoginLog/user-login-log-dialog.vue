<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/monitor/userLoginLog/utils/columns';
import { FormProps } from '@/views/monitor/userLoginLog/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 用户Id
		userId: undefined,
		// 用户名
		username: undefined,
		// 登录token
		token: undefined,
		// 登录Ip
		ipAddress: undefined,
		// 登录Ip归属地
		ipRegion: undefined,
		// 登录时代理
		userAgent: undefined,
		// 操作类型
		type: undefined,
		// 标识客户端是否是通过Ajax发送请求的
		xRequestedWith: undefined,
		// 用户代理的品牌和版本
		secChUa: undefined,
		// 用户代理的底层平台架构
		secChUaArch: undefined,
		// 用户代理的底层CPU架构位数
		secChUaBitness: undefined,
		// 用户代理是否在手机设备上运行
		secChUaMobile: undefined,
		// 用户代理的设备模型
		secChUaModel: undefined,
		// 用户代理的底层操作系统/平台
		secChUaPlatform: undefined,
		// 用户代理的底层操作系统版本
		secChUaPlatformVersion: undefined,
		// 客户端设备像素比
		contentDpr: undefined,
		// 客户端RAM内存的近似值
		deviceMemory: undefined,
		// 客户端设备像素比
		dpr: undefined,
		// 布局视口宽度
		viewportWidth: undefined,
		// 所需资源宽度
		width: undefined,
		// 客户端连接到服务器的近似带宽
		downlink: undefined,
		// 有效连接类型
		ect: undefined,
		// 应用层往返时间
		rtt: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<!-- 用户Id -->
		<el-form-item :label="$t('userLoginLog_userId')" prop="userId">
			<el-input v-model="form.userId" :placeholder="$t('input') + $t('userLoginLog_userId')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户名 -->
		<el-form-item :label="$t('userLoginLog_username')" prop="username">
			<el-input v-model="form.username" :placeholder="$t('input') + $t('userLoginLog_username')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 登录token -->
		<el-form-item :label="$t('userLoginLog_token')" prop="token">
			<el-input v-model="form.token" :placeholder="$t('input') + $t('userLoginLog_token')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 登录Ip -->
		<el-form-item :label="$t('userLoginLog_ipAddress')" prop="ipAddress">
			<el-input v-model="form.ipAddress" :placeholder="$t('input') + $t('userLoginLog_ipAddress')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 登录Ip归属地 -->
		<el-form-item :label="$t('userLoginLog_ipRegion')" prop="ipRegion">
			<el-input v-model="form.ipRegion" :placeholder="$t('input') + $t('userLoginLog_ipRegion')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 登录时代理 -->
		<el-form-item :label="$t('userLoginLog_userAgent')" prop="userAgent">
			<el-input v-model="form.userAgent" :placeholder="$t('input') + $t('userLoginLog_userAgent')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 操作类型 -->
		<el-form-item :label="$t('userLoginLog_type')" prop="type">
			<el-input v-model="form.type" :placeholder="$t('input') + $t('userLoginLog_type')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 标识客户端是否是通过Ajax发送请求的 -->
		<el-form-item :label="$t('userLoginLog_xRequestedWith')" prop="xRequestedWith">
			<el-input v-model="form.xRequestedWith" :placeholder="$t('input') + $t('userLoginLog_xRequestedWith')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户代理的品牌和版本 -->
		<el-form-item :label="$t('userLoginLog_secChUa')" prop="secChUa">
			<el-input v-model="form.secChUa" :placeholder="$t('input') + $t('userLoginLog_secChUa')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户代理的底层平台架构 -->
		<el-form-item :label="$t('userLoginLog_secChUaArch')" prop="secChUaArch">
			<el-input v-model="form.secChUaArch" :placeholder="$t('input') + $t('userLoginLog_secChUaArch')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户代理的底层CPU架构位数 -->
		<el-form-item :label="$t('userLoginLog_secChUaBitness')" prop="secChUaBitness">
			<el-input v-model="form.secChUaBitness" :placeholder="$t('input') + $t('userLoginLog_secChUaBitness')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户代理是否在手机设备上运行 -->
		<el-form-item :label="$t('userLoginLog_secChUaMobile')" prop="secChUaMobile">
			<el-input v-model="form.secChUaMobile" :placeholder="$t('input') + $t('userLoginLog_secChUaMobile')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户代理的设备模型 -->
		<el-form-item :label="$t('userLoginLog_secChUaModel')" prop="secChUaModel">
			<el-input v-model="form.secChUaModel" :placeholder="$t('input') + $t('userLoginLog_secChUaModel')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户代理的底层操作系统/平台 -->
		<el-form-item :label="$t('userLoginLog_secChUaPlatform')" prop="secChUaPlatform">
			<el-input v-model="form.secChUaPlatform" :placeholder="$t('input') + $t('userLoginLog_secChUaPlatform')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户代理的底层操作系统版本 -->
		<el-form-item :label="$t('userLoginLog_secChUaPlatformVersion')" prop="secChUaPlatformVersion">
			<el-input v-model="form.secChUaPlatformVersion" :placeholder="$t('input') + $t('userLoginLog_secChUaPlatformVersion')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 客户端设备像素比 -->
		<el-form-item :label="$t('userLoginLog_contentDpr')" prop="contentDpr">
			<el-input v-model="form.contentDpr" :placeholder="$t('input') + $t('userLoginLog_contentDpr')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 客户端RAM内存的近似值 -->
		<el-form-item :label="$t('userLoginLog_deviceMemory')" prop="deviceMemory">
			<el-input v-model="form.deviceMemory" :placeholder="$t('input') + $t('userLoginLog_deviceMemory')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 客户端设备像素比 -->
		<el-form-item :label="$t('userLoginLog_dpr')" prop="dpr">
			<el-input v-model="form.dpr" :placeholder="$t('input') + $t('userLoginLog_dpr')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 布局视口宽度 -->
		<el-form-item :label="$t('userLoginLog_viewportWidth')" prop="viewportWidth">
			<el-input v-model="form.viewportWidth" :placeholder="$t('input') + $t('userLoginLog_viewportWidth')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 所需资源宽度 -->
		<el-form-item :label="$t('userLoginLog_width')" prop="width">
			<el-input v-model="form.width" :placeholder="$t('input') + $t('userLoginLog_width')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 客户端连接到服务器的近似带宽 -->
		<el-form-item :label="$t('userLoginLog_downlink')" prop="downlink">
			<el-input v-model="form.downlink" :placeholder="$t('input') + $t('userLoginLog_downlink')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 有效连接类型 -->
		<el-form-item :label="$t('userLoginLog_ect')" prop="ect">
			<el-input v-model="form.ect" :placeholder="$t('input') + $t('userLoginLog_ect')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 应用层往返时间 -->
		<el-form-item :label="$t('userLoginLog_rtt')" prop="rtt">
			<el-input v-model="form.rtt" :placeholder="$t('input') + $t('userLoginLog_rtt')" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
