<script lang="ts" setup>
import { useNav } from '@/layout/hooks/useNav';
import LaySearch from '../lay-search/index.vue';
import LayNotice from '../lay-notice/index.vue';
import LayNavMix from '../lay-sidebar/NavMix.vue';
import { useTranslationLang } from '@/layout/hooks/useTranslationLang';
import LaySidebarFullScreen from '../lay-sidebar/components/SidebarFullScreen.vue';
import LaySidebarBreadCrumb from '../lay-sidebar/components/SidebarBreadCrumb.vue';
import LaySidebarTopCollapse from '../lay-sidebar/components/SidebarTopCollapse.vue';

import GlobalizationIcon from '@/assets/svg/globalization.svg?component';
import Setting from '@iconify-icons/ri/settings-3-line';
import Check from '@iconify-icons/ep/check';
import { $t } from '@/plugins/i18n';
import { userI18nTypeStore } from '@/store/i18n/i18nType';
import { onMounted } from 'vue';
import DropdownMenu from '@/layout/components/lay-navbar/dropdown-menu.vue';

const {
  layout,
  device,
  logout,
  onPanel,
  pureApp,
  username,
  userAvatar,
  avatarsStyle,
  toggleSideBar,
  getDropdownItemStyle,
  getDropdownItemClass,
} = useNav();

const { locale, translation } = useTranslationLang();

const i18nTypeStore = userI18nTypeStore();

onMounted(() => {
  i18nTypeStore.loadI18nTypeList();
});
</script>

<template>
  <div class="navbar bg-[#fff] shadow-sm shadow-[rgba(0,21,41,0.08)]">
    <LaySidebarTopCollapse
      v-if="device === 'mobile'"
      :is-active="pureApp.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <LaySidebarBreadCrumb v-if="layout !== 'mix' && device !== 'mobile'" class="breadcrumb-container" />

    <LayNavMix v-if="layout === 'mix'" />

    <div v-if="layout === 'vertical'" class="vertical-header-right">
      <!-- 菜单搜索 -->
      <LaySearch id="header-search" />
      <!-- 国际化 -->
      <el-dropdown id="header-translation" trigger="click">
        <GlobalizationIcon class="navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none" />
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
      <dropdown-menu />
      <!-- 打开设置 -->
      <span :title="$t('buttons.pureOpenSystemSet')" class="set-icon navbar-bg-hover" @click="onPanel">
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 48px;
    cursor: pointer;
  }

  .vertical-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 280px;
    height: 48px;
    color: #000000d9;
  }

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
  }
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check {
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
