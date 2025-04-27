<script lang="ts" setup>
import ReAnimateSelector from '@/components/ReAnimateSelector/src/index.vue';
import ReCol from '@/components/ReCol';
import Segmented from '@/components/ReSegmented';
import {
  fixedTagOptions,
  frameLoadingOptions,
  hiddenTagOptions,
  keepAliveOptions,
  menuTypeOptions,
  showLinkOptions,
  showParentOptions,
} from '@/enums/menu';
import { $t } from '@/plugins/i18n';
import { FormProps, formRules } from '@/views/system/menu/utils';
import { onMounted, ref } from 'vue';
import { userMenuStore } from '@/store/system/menu';
import { useRoleStore } from '@/store/system/role';
import NetWorkIcon from '@/components/ReIcon/src/NetWorkIcon.vue';

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: '',
    menuType: 0,
    higherMenuOptions: [],
    parentId: 0,
    title: '',
    name: '',
    path: '',
    component: '',
    rank: 99,
    icon: '',
    extraIcon: '',
    enterTransition: '',
    leaveTransition: '',
    activePath: '',
    redirect: '',
    roles: [],
    frameSrc: '',
    frameLoading: true,
    keepAlive: false,
    hiddenTag: false,
    fixedTag: false,
    showLink: true,
    showParent: false,
  }),
});

const roleStore = useRoleStore();
const menuStore = userMenuStore();
// 表单Ref
const formRef = ref();
const form = ref(props.formInline);

/* 根据路由id获取当前角色 */
const getRoleListByRouterId = async () => {
  // 初始化值为空数组
  form.value.roles = [];

  // 根据路由id查找当前菜单所拥有的角色
  const routerId = form.value.id;
  if (routerId) {
    form.value.roles = await menuStore.loadRoleListByRouterId({ routerId });
  }
};

onMounted(() => {
  // 获取所有的角色列表
  roleStore.loadRoleList();

  // 根据当前路由id，查找这个路由下所有的角色信息
  getRoleListByRouterId();
});

defineExpose({ menuFormRef: formRef });
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="formRules" label-width="82px">
    <!-- 菜单类型：菜单、外链等 -->
    <el-row :gutter="30">
      <re-col>
        <el-form-item :label="$t('menuType')">
          <Segmented
            v-model="form.menuType"
            :options="menuTypeOptions"
            @change="
              ({ option: { value } }) => {
                form.menuType = value;
              }
            "
          />
        </el-form-item>
      </re-col>
      <!-- 上级菜单 -->
      <re-col>
        <el-form-item :label="$t('previousMenu')">
          <el-cascader
            v-model="form.parentId"
            :options="form.higherMenuOptions"
            :props="{ value: 'id', label: 'title', emitPath: false, checkStrictly: true }"
            class="w-full"
            clearable
            filterable
            placeholder="请选择上级菜单"
          >
            <template #default="{ node, data }">
              <span>{{ data.title }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>

      <!-- 菜单名称 -->
      <re-col :sm="24" :value="12" :xs="24">
        <el-form-item :label="$t('menuName')" prop="title">
          <el-input v-model="form.title" clearable placeholder="请输入菜单名称" />
          <el-text v-if="form.title" type="success">{{ $t(form.title) }}</el-text>
        </el-form-item>
      </re-col>
      <!-- 路由名称 -->
      <re-col :sm="24" :value="12" :xs="24">
        <el-form-item :label="$t('routerName')" prop="name">
          <el-input v-model="form.name" clearable placeholder="请输入路由名称" />
        </el-form-item>
      </re-col>

      <!-- 路由路径 -->
      <re-col :sm="24" :value="12" :xs="24">
        <el-form-item :label="$t('routerPath')" prop="path">
          <el-input v-model="form.path" clearable placeholder="请输入路由路径" />
        </el-form-item>
      </re-col>

      <!-- 组件路径 -->
      <re-col v-show="form.menuType === 0" :sm="24" :value="12" :xs="24">
        <el-form-item :label="$t('componentPath')">
          <el-input v-model="form.component" clearable placeholder="请输入组件路径" />
        </el-form-item>
      </re-col>

      <!-- 路由等级 Rank -->
      <re-col :sm="24" :value="12" :xs="24">
        <el-form-item v-model="form.rank" :label="$t('sort')" prop="rank">
          <el-input-number v-model="form.rank" :max="9999" :min="1" class="!w-full" controls-position="right" />
        </el-form-item>
      </re-col>

      <!-- 菜单图标 -->
      <re-col :sm="24" :value="12" :xs="24">
        <el-form-item label="菜单图标" prop="icon">
          <!--<IconSelect v-show="true" :form-inline="form" class="w-full" />-->
          <NetWorkIcon :form-inline="form" class="w-full" />
        </el-form-item>
      </re-col>

      <!-- 进场动画 -->
      <re-col v-show="form.menuType < 2" :sm="24" :value="12" :xs="24">
        <el-form-item label="进场动画">
          <ReAnimateSelector v-model="form.enterTransition" placeholder="请选择页面进场加载动画" />
        </el-form-item>
      </re-col>
      <!-- 离场动画 -->
      <re-col v-show="form.menuType < 2" :sm="24" :value="12" :xs="24">
        <el-form-item label="离场动画">
          <ReAnimateSelector v-model="form.leaveTransition" placeholder="请选择页面离场加载动画" />
        </el-form-item>
      </re-col>
      <!-- 菜单激活 -->
      <re-col v-show="form.menuType === 0" :sm="24" :value="12" :xs="24">
        <el-form-item label="菜单激活">
          <el-input v-model="form.activePath" clearable placeholder="请输入需要激活的菜单" />
        </el-form-item>
      </re-col>

      <re-col v-show="form.menuType === 1" :sm="24" :value="12" :xs="24">
        <!-- iframe -->
        <el-form-item label="链接地址">
          <el-input v-model="form.frameSrc" clearable placeholder="请输入 iframe 链接地址" />
        </el-form-item>
      </re-col>
      <!-- 加载动画 -->
      <re-col v-if="form.menuType === 1" :sm="24" :value="12" :xs="24">
        <el-form-item label="加载动画">
          <Segmented
            :modelValue="form.frameLoading ? 0 : 1"
            :options="frameLoadingOptions"
            @change="
              ({ option: { value } }) => {
                form.frameLoading = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <!-- 显示菜单 -->
      <re-col v-show="form.menuType !== 3" :sm="24" :value="12" :xs="24">
        <el-form-item label="显示菜单">
          <Segmented
            :modelValue="form.showLink ? 0 : 1"
            :options="showLinkOptions"
            @change="
              ({ option: { value } }) => {
                form.showLink = value;
              }
            "
          />
        </el-form-item>
      </re-col>
      <!-- 父级菜单 -->
      <re-col v-show="form.menuType !== 3" :sm="24" :value="12" :xs="24">
        <el-form-item label="父级菜单">
          <Segmented
            :modelValue="form.showParent ? 0 : 1"
            :options="showParentOptions"
            @change="
              ({ option: { value } }) => {
                form.showParent = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <!-- 缓存页面 -->
      <re-col v-show="form.menuType < 2" :sm="24" :value="12" :xs="24">
        <el-form-item label="缓存页面">
          <Segmented
            :modelValue="form.keepAlive ? 0 : 1"
            :options="keepAliveOptions"
            @change="
              ({ option: { value } }) => {
                form.keepAlive = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <!-- 标签页 -->
      <re-col v-show="form.menuType < 2" :sm="24" :value="12" :xs="24">
        <el-form-item label="标签页">
          <Segmented
            :modelValue="form.hiddenTag ? 1 : 0"
            :options="hiddenTagOptions"
            @change="
              ({ option: { value } }) => {
                form.hiddenTag = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <!-- 固定标签页 -->
      <re-col :sm="24" :value="12" :xs="24">
        <el-form-item label="固定标签页">
          <Segmented
            :modelValue="form.fixedTag ? 0 : 1"
            :options="fixedTagOptions"
            @change="
              ({ option: { value } }) => {
                form.fixedTag = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <!-- 角色标识 -->
      <re-col :sm="24" :value="24" :xs="24">
        <el-form-item label="角色标识" prop="auths">
          <el-select v-model="form.roles" clearable filterable multiple placeholder="请输入角色标识">
            <el-option v-for="item in roleStore.allRoleList" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
