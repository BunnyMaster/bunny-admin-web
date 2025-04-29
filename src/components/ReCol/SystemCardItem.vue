<script lang="ts" setup>
// import 'echarts-gl';
import { cardClass, cardLogoClass } from '@/views/monitor/server/utils/columns';

defineProps({
  title: String,
  xl: { type: Number, default: 6 },
  lg: { type: Number, default: 12 },
  md: { type: Number, default: 12 },
  sm: { type: Number, default: 24 },
  xs: { type: Number, default: 24 },
});
</script>

<template>
  <el-col :lg="lg" :md="md" :sm="sm" :xl="xl" :xs="xs">
    <div :class="cardClass">
      <div class="list-card-item_detail bg-bg_color">
        <el-row justify="space-between">
          <div :class="cardLogoClass">
            <slot name="icon" />
          </div>
        </el-row>
        <p class="list-card-item_detail--name text-text_color_primary">
          {{ title }}
        </p>
        <slot name="default" />
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
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      font-size: 12px;
      line-height: 20px;
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
