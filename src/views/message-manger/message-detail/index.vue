<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { deviceDetection, useGlobal } from '@pureadmin/utils';
import { useDataThemeChange } from '@/layout/hooks/useDataThemeChange';
import leftLine from '@iconify-icons/ri/arrow-left-s-line';
import { $t } from '@/plugins/i18n';
import { useMessageTypeStore } from '@/store/message/messageType';
import { onSearch } from '@/views/message-manger/message-detail/utils';

const isOpen = ref(!deviceDetection());
const { $storage } = useGlobal<GlobalPropertiesApi>();
const router = useRouter();
const route = useRoute();
const messageTypeStore = useMessageTypeStore();

/** 点击菜单时 */
const onMenuClick = (item: any) => {
  messageTypeStore.form.messageType = item.messageType;
  router.push({ path: `/message-detail/${item.messageType}` });
  onSearch(item.messageType);
};

onBeforeMount(() => {
  // 获取所有消息类型
  messageTypeStore.getAllMessageTypeList();

  // 设置路由消息类型
  messageTypeStore.form.messageType = route.params.messageType as string;
  useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
});
</script>

<template>
  <el-container class="h-full">
    <el-aside
      v-if="isOpen"
      :width="deviceDetection() ? '180 px' : '240px'"
      class="pure-account-settings overflow-hidden px-2 dark:!bg-[var(--el-bg-color)] border-r-[1px] border-[var(--pure-border-color)]"
    >
      <el-menu :default-active="messageTypeStore.form.messageType" class="pure-account-settings-menu">
        <el-menu-item class="!h-[50px]" @click="router.go(-1)">
          <div class="flex items-center hover:!transition-all hover:!duration-200 hover:!text-base">
            <IconifyIconOffline :icon="leftLine" />
            <span>{{ $t('back') }}</span>
          </div>
          <el-button class="ml-2" link type="primary" @click="router.push('/')">{{ $t('returnToHomepage') }}</el-button>
        </el-menu-item>
        <el-menu-item
          v-for="item in messageTypeStore.allMessageTypeList"
          :key="item.id"
          :class="messageTypeStore.form.messageType === item.messageType ? 'is-active' : ''"
          :index="item.id"
          @click="onMenuClick(item)"
        >
          <div class="flex items-center z-10">
            <span>{{ item.messageName }}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="w-[100%]">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style lang="scss">
.pure-account-settings {
  background: $menuBg;
}

.pure-account-settings-menu {
  background-color: transparent;
  border: none;

  .el-menu-item {
    height: 48px !important;
    color: $menuText;
    background-color: transparent !important;
    transition: color 0.2s;

    &:hover {
      color: $menuTitleHover !important;
    }

    &.is-active {
      color: #fff !important;

      &:hover {
        color: #fff !important;
      }

      &::before {
        position: absolute;
        inset: 0 8px;
        margin: 4px 0;
        clear: both;
        content: '';
        background: var(--el-color-primary);
        border-radius: 3px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
body[layout] {
  .el-menu--vertical .is-active {
    color: #fff !important;
    transition: color 0.2s;

    &:hover {
      color: #fff !important;
    }
  }
}
</style>
