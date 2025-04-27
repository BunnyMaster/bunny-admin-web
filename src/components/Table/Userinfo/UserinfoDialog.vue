<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { loadUserinfoById } from '@/api/v1/system/adminUser';
import userAvatarIcon from '@/assets/svg/user_avatar.svg?component';
import { $t } from '@/plugins/i18n';

const props = defineProps({
  userId: { type: String as PropType<String> },
});
const userinfo = ref();
const loading = ref(false);

/* 获取用户信息 */
const getUserInfo = async () => {
  loading.value = true;
  // 如果没有传入用户ID直接返回
  if (!props.userId) {
    loading.value = false;
    return;
  }

  // 判断是否是web端
  const result = await loadUserinfoById({ id: props.userId });
  if (result.code === 200) {
    userinfo.value = result.data;
  }

  loading.value = false;
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <div>
    <div v-if="userId && userinfo" class="list-card-item bg-bg_color">
      <!-- 标题内容 -->
      <el-row justify="space-between">
        <div class="flex flex-row justify-center items-center">
          <div class="list-card-item_detail--logo">
            <userAvatarIcon />
          </div>
          <h1 class="list-card-item_detail--name">{{ $t('user_details') }}</h1>
        </div>
        <el-tag
          :color="userinfo.status ? '#F67676' : '#00a870'"
          class="mx-1 list-card-item_detail--operation--tag"
          effect="dark"
        >
          {{ $t('user_status') }}：{{ userinfo.status ? $t('disable') : $t('normal') }}
        </el-tag>
      </el-row>

      <!-- 用户详情 -->
      <el-descriptions border>
        <el-descriptions-item :label="$t('avatar')" :width="100" align="center">
          <el-image :src="userinfo.avatar" style="width: 100px; height: 100px" />
        </el-descriptions-item>
        <el-descriptions-item :label="$t('username')" :width="100">{{ userinfo.username }}</el-descriptions-item>
        <el-descriptions-item :label="$t('nickname')" :width="100">{{ userinfo.nickname }}</el-descriptions-item>

        <el-descriptions-item :label="$t('email')">{{ userinfo.email }}</el-descriptions-item>
        <el-descriptions-item :label="$t('phone')">{{ userinfo.phone }}</el-descriptions-item>
        <el-descriptions-item :label="$t('sex')">
          <el-tag v-if="userinfo.sex === 1">男</el-tag>
          <el-tag v-if="userinfo.sex === 0" type="danger">女</el-tag>
        </el-descriptions-item>

        <el-descriptions-item :label="$t('personDescription')" span="3">
          {{ userinfo.personDescription }}
        </el-descriptions-item>

        <el-descriptions-item :label="$t('table.createTime')" span="1.5">
          {{ userinfo.createTime }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('table.updateTime')" span="1.5">
          {{ userinfo.updateTime }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 加载内容 -->
    <div v-if="loading" class="list-card-item bg-bg_color">
      <!-- 标题内容 -->
      <el-row justify="space-between">
        <div class="flex flex-row justify-center items-center">
          <div class="list-card-item_detail--logo">
            <userAvatarIcon />
          </div>
          <h1 class="list-card-item_detail--name">{{ $t('user_details') }}</h1>
        </div>
        <el-tag class="mx-1 list-card-item_detail--operation--tag" color="#00a870" effect="dark">loading...</el-tag>
      </el-row>

      <!-- 用户详情 -->
      <el-descriptions border>
        <el-descriptions-item :label="$t('avatar')" :width="100" align="center">
          <el-skeleton animated class="flex justify-center">
            <template #template>
              <el-skeleton-item style="width: 100px; height: 100px" variant="image" />
            </template>
          </el-skeleton>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('username')" :width="100">
          <el-skeleton :rows="1" animated />
        </el-descriptions-item>
        <el-descriptions-item :label="$t('nickname')" :width="100">
          <el-skeleton :rows="1" animated />
        </el-descriptions-item>

        <el-descriptions-item :label="$t('email')">
          <el-skeleton :rows="1" animated />
        </el-descriptions-item>
        <el-descriptions-item :label="$t('phone')">
          <el-skeleton :rows="1" animated />
        </el-descriptions-item>
        <el-descriptions-item :label="$t('sex')">
          <el-skeleton :rows="1" animated />
        </el-descriptions-item>

        <el-descriptions-item :label="$t('personDescription')" span="3">
          <el-skeleton :rows="1" animated />
        </el-descriptions-item>

        <el-descriptions-item :label="$t('table.createTime')" span="1.5">
          <el-skeleton :rows="1" animated />
        </el-descriptions-item>
        <el-descriptions-item :label="$t('table.updateTime')" span="1.5">
          <el-skeleton :rows="1" animated />
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 数据为空 -->
    <el-empty v-if="(!userId || !userinfo) && !loading" :description="$t('no_data')" />
  </div>
</template>

<style lang="scss" scoped>
.list-card-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  overflow: hidden;
  border-radius: 3px;

  &_detail {
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
        margin: 15px 0;
        border: 0;
      }
    }

    &--name {
      margin: 0 0 0 8px;
      font-size: 16px;
      font-weight: 400;
    }
  }

  &__disabled {
    .list-card-item_detail--name,
    .list-card-item_detail--desc {
      color: var(--el-text-color-disabled);
    }

    .list-card-item_detail--operation--tag {
      color: #bababa;
    }
  }
}
</style>
