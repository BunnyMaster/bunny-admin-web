<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { useNav } from '@/layout/hooks/useNav';
import { findRouteByPath, getParentPaths } from '@/router/utils';
import { usePermissionStoreHook } from '@/store/permission';
import { isAllEmpty } from '@pureadmin/utils';
import { nextTick, onMounted, ref, toRaw, watch } from 'vue';
import { useTranslationLang } from '../../hooks/useTranslationLang';
import LayNotice from '../lay-notice/index.vue';
import LaySearch from '../lay-search/index.vue';
import LaySidebarExtraIcon from '../lay-sidebar/components/SidebarExtraIcon.vue';
import LaySidebarFullScreen from '../lay-sidebar/components/SidebarFullScreen.vue';

import GlobalizationIcon from '@/assets/svg/globalization.svg?component';
import Check from '~icons/ep/check';
import LogoutCircleRLine from '~icons/ri/logout-circle-r-line';
import Setting from '~icons/ri/settings-3-line';
import { useI18n } from 'vue-i18n';
import { $t } from '@/plugins/i18n';
import { userI18nTypeStore } from '@/store/i18n/i18nType';

const menuRef = ref();
const defaultActive = ref(null);
const { t } = useI18n();
const { route, locale, translation } = useTranslationLang(menuRef);
const { device, logout, onPanel, resolvePath, username, userAvatar, getDivStyle, avatarsStyle, getDropdownItemStyle, getDropdownItemClass } = useNav();

function getDefaultActive(routePath) {
  const wholeMenus = usePermissionStoreHook().wholeMenus;
  /** 当前路由的父级路径 */
  const parentRoutes = getParentPaths(routePath, wholeMenus)[0];
  defaultActive.value = !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : findRouteByPath(parentRoutes, wholeMenus)?.children[0]?.path;
}

const i18nTypeStore = userI18nTypeStore();

onMounted(() => {
  getDefaultActive(route.path);
});

nextTick(() => {
  menuRef.value?.handleResize();
});

watch(
  () => [route.path, usePermissionStoreHook().wholeMenus],
  () => {
    getDefaultActive(route.path);
  }
);
</script>

<template>
  <div v-if="device !== 'mobile'" v-loading="usePermissionStoreHook().wholeMenus.length === 0" class="horizontal-header">
    <el-menu ref="menuRef" :default-active="defaultActive" class="horizontal-header-menu" mode="horizontal" popper-class="pure-scrollbar" router>
      <el-menu-item v-for="route in usePermissionStoreHook().wholeMenus" :key="route.path" :index="resolvePath(route) || route.redirect">
        <template #title>
          <div v-if="toRaw(route.meta.icon)" :class="['sub-menu-icon', route.meta.icon]">
            <component :is="useRenderIcon(route.meta && toRaw(route.meta.icon))" />
          </div>
          <div :style="getDivStyle">
            <span class="select-none">
              {{ t(route.meta.title) }}
            </span>
            <LaySidebarExtraIcon :extraIcon="route.meta.extraIcon" />
          </div>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="horizontal-header-right">
      <!-- 菜单搜索 -->
      <LaySearch id="header-search" />
      <!-- 国际化 -->
      <el-dropdown trigger="click">
        <GlobalizationIcon class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300" />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              v-for="item in i18nTypeStore.translationTypeList"
              :key="item.key"
              :class="['dark:!text-white', getDropdownItemClass(locale, item.key)]"
              :style="getDropdownItemStyle(locale, item.key)"
              @click="translation(item.key)"
            >
              <span v-show="locale === item.key" class="check">
                <IconifyIconOffline :icon="Check" />
              </span>
              {{ item.value }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 全屏 -->
      <LaySidebarFullScreen id="full-screen" />
      <!-- 消息通知 -->
      <LayNotice id="header-notice" />
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link navbar-bg-hover select-none">
          <img :src="userAvatar" :style="avatarsStyle" />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout">
              <IconifyIconOffline :icon="LogoutCircleRLine" style="margin: 5px" />
              {{ $t('buttons.pureLoginOut') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span :title="$t('buttons.pureOpenSystemSet')" class="set-icon navbar-bg-hover" @click="onPanel">
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.logout {
  width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
