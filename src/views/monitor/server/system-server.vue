<script lang="ts" setup>
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { cardClass, cardLogoClass } from '@/views/monitor/server/utils/columns';
import { systemServerInfo } from '@/views/monitor/server/utils/hooks';
import { $t } from '@/plugins/i18n';

/** 格式化值 */
const formatValue = (va: any) => {
	va = va / 1024 / 1024 / 1024;
	return va.toFixed(2);
};
</script>

<template>
	<!-- 系统状态 -->
	<el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
		<div :class="cardClass">
			<div class="list-card-item_detail bg-bg_color">
				<el-row justify="space-between">
					<div :class="cardLogoClass">
						<component :is="useRenderIcon('pajamas:status-health')" />
					</div>
					<div class="list-card-item_detail--operation">
						<el-tag :color="systemServerInfo?.components?.diskSpace?.status === 'UP' ? '#00a870' : '#eee'" class="mx-1 list-card-item_detail--operation--tag" effect="dark">
							{{ systemServerInfo?.components?.diskSpace?.status === 'UP' ? $t('enable') : $t('disable') }}
						</el-tag>
					</div>
				</el-row>
				<p class="list-card-item_detail--name text-text_color_primary">系统状态</p>
				<el-text>
					<div>系统状态：{{ systemServerInfo?.status === 'UP' ? '正常' : '异常' }}</div>
					<div>ping：{{ systemServerInfo?.components?.ping?.status === 'UP' ? '正常' : '异常' }}</div>
					<div>磁盘总量：{{ formatValue(systemServerInfo?.components?.diskSpace.details.total) }}GB</div>
					<div>磁盘可用：{{ formatValue(systemServerInfo?.components?.diskSpace.details.free) }}GB</div>
					<div>阈值：{{ formatValue(systemServerInfo?.components?.diskSpace.details.threshold) }}GB</div>
					<div>项目位置：{{ systemServerInfo?.components?.diskSpace.details.path }}</div>
					<div>是否存在：{{ systemServerInfo?.components?.diskSpace.details.exists ? '是' : '否' }}</div>
				</el-text>
			</div>
		</div>
	</el-col>

	<!-- 数据库状态 -->
	<el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
		<div :class="cardClass">
			<div class="list-card-item_detail bg-bg_color">
				<el-row justify="space-between">
					<div :class="cardLogoClass">
						<component :is="useRenderIcon('raphael:db')" />
					</div>
					<div class="list-card-item_detail--operation">
						<el-tag :color="systemServerInfo?.components?.db?.status === 'UP' ? '#00a870' : '#eee'" class="mx-1 list-card-item_detail--operation--tag" effect="dark">
							{{ systemServerInfo?.components?.db?.status === 'UP' ? $t('enable') : $t('disable') }}
						</el-tag>
					</div>
				</el-row>
				<p class="list-card-item_detail--name text-text_color_primary">数据库状态</p>
				<el-text>
					<div>数据库状态：{{ systemServerInfo?.components?.db?.status === 'UP' ? $t('enable') : $t('disable') }}</div>
					<div>数据库类型：{{ systemServerInfo?.components?.db?.details.database }}</div>
					<div>验证查询：{{ systemServerInfo?.components?.db?.details.validationQuery }}</div>
				</el-text>
			</div>
		</div>
	</el-col>

	<!-- Redis状态 -->
	<el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
		<div :class="cardClass">
			<div class="list-card-item_detail bg-bg_color">
				<el-row justify="space-between">
					<div :class="cardLogoClass">
						<component :is="useRenderIcon('devicon:redis')" />
					</div>
					<div class="list-card-item_detail--operation">
						<el-tag :color="systemServerInfo?.components?.redis?.status === 'UP' ? '#00a870' : '#eee'" class="mx-1 list-card-item_detail--operation--tag" effect="dark">
							{{ systemServerInfo?.components?.redis?.status === 'UP' ? $t('enable') : $t('disable') }}
						</el-tag>
					</div>
				</el-row>
				<p class="list-card-item_detail--name text-text_color_primary">Redis状态</p>
				<el-text>
					<div>Redis状态：{{ systemServerInfo?.components?.redis?.status === 'UP' ? $t('enable') : $t('disable') }}</div>
					<div>Redis版本：{{ systemServerInfo?.components?.redis?.details.version }}</div>
				</el-text>
			</div>
		</div>
	</el-col>
</template>

<style lang="scss" scoped>
.list-card-item {
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 3px;

	&_detail {
		flex: 1;
		min-height: 140px;
		padding: 24px 32px;

		&--logo {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 46px;
			height: 46px;
			font-size: 26px;
			color: #0052d9;
			background: #e0ebff;
			border-radius: 50%;

			&__disabled {
				color: #a1c4ff;
			}
		}

		&--operation {
			display: flex;
			height: 100%;

			&--tag {
				border: 0;
			}
		}

		&--name {
			margin: 24px 0 8px;
			font-size: 16px;
			font-weight: 400;
		}

		&--desc {
			display: -webkit-box;
			height: 40px;
			margin-bottom: 24px;
			overflow: hidden;
			font-size: 12px;
			line-height: 20px;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	&__disabled {
		.list-card-item_detail--name {
			color: var(--el-text-color-disabled);
		}

		.list-card-item_detail--operation--tag {
			color: #bababa;
		}
	}
}
</style>
