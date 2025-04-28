<script lang="ts" setup>
import { Text } from '@/components/ReText';
import LaySidebarTopCollapse from '@/layout/components/lay-sidebar/components/SidebarTopCollapse.vue';
import { useDataThemeChange } from '@/layout/hooks/useDataThemeChange';
import { $t } from '@/plugins/i18n';
import { panes, userInfos } from '@/views/account-settings/utils';
import leftLine from '@iconify-icons/ri/arrow-left-s-line';
import { deviceDetection, useGlobal } from '@pureadmin/utils';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(!deviceDetection());
const { $storage } = useGlobal<GlobalPropertiesApi>();
const witchPane = ref('profile');

onBeforeMount(() => {
  useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
});
</script>

<template>
  <el-container class="h-full">
    <el-aside
      v-if="isOpen"
      :width="deviceDetection() ? '180px' : '240px'"
      class="pure-account-settings overflow-hidden px-2 dark:!bg-[var(--el-bg-color)] border-r-[1px] border-[var(--pure-border-color)]"
    >
      <el-menu :default-active="witchPane" class="pure-account-settings-menu">
        <el-menu-item class="!h-[50px]" @click="router.go(-1)">
          <div class="flex items-center">
            <IconifyIconOffline :icon="leftLine" />
            <span class="ml-2">{{ $t('back') }}</span>
          </div>
          <el-button class="ml-2" link type="primary" @click="router.push('/')">{{ $t('returnToHomepage') }}</el-button>
        </el-menu-item>

        <div class="flex items-center ml-8 mt-4 mb-4">
          <el-avatar :size="48" :src="userInfos.avatar" />
          <div class="ml-4 flex flex-col max-w-[130px]">
            <Text class="font-bold !self-baseline">
              {{ userInfos.nickname }}
            </Text>
            <Text class="!self-baseline" type="info">
              {{ userInfos.username }}
            </Text>
          </div>
        </div>
        <el-menu-item
          v-for="item in panes"
          :key="item.key"
          :index="item.key"
          @click="
            () => {
              witchPane = item.key;
              if (deviceDetection()) {
                isOpen = !isOpen;
              }
            }
          "
        >
          <div class="flex items-center z-10">
            <el-icon>
              <IconifyIconOffline :icon="item.icon" />
            </el-icon>
            <span>{{ item.label }}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <LaySidebarTopCollapse v-if="deviceDetection()" :is-active="isOpen" class="px-0" @toggleClick="isOpen = !isOpen" />
      <component :is="panes.find((item) => item.key === witchPane).component" :class="[!deviceDetection() && 'ml-[120px]']" />
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
