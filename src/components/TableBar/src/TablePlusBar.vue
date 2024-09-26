<script lang="ts" setup>
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  PropType,
  ref,
  unref,
  watch
} from "vue";
import { rendTipProps } from "@/components/TableBar/utils/tableConfig";
import {
  cellHeaderStyle,
  getDropdownItemStyle,
  iconClass,
  topClass
} from "@/components/TableBar/utils/tableStyle";
import PureTable from "@pureadmin/table";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import RefreshIcon from "@/assets/table-bar/refresh.svg?component";
import CollapseIcon from "@/assets/table-bar/collapse.svg?component";
import SettingIcon from "@/assets/table-bar/settings.svg?component";
import { cloneDeep, getKeyList, isBoolean, isFunction } from "@pureadmin/utils";
import DragIcon from "@/assets/table-bar/drag.svg?component";
import Sortable from "sortablejs";
import { $t } from "@/plugins/i18n";
import { DeleteFilled, EditPen } from "@element-plus/icons-vue";
import { useRenderIcon } from "@/components/CommonIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import { FormInstance } from "element-plus";

// * 传入数据
const props = defineProps({
  // 表格数据
  dataList: { type: Array<any>, default: [] },
  // 表格列字段
  column: { type: Array as PropType<any>, default: () => [] },
  // 是否加载
  loading: { type: Boolean, default: false },
  // 表格头部查询
  tableQueryFormVisible: { type: Boolean, default: true },
  // 页面字体大小，small | default | large
  size: { type: String as PropType<any>, default: "default" },
  // 分页器参数
  pagination: { type: Object, default: Object },
  // 选择行发生变化
  handleSelectionChange: {
    type: Function as PropType<Function>,
    default: () => {}
  },
  // 分页大小变化
  handleSizeChange: {
    type: Function as PropType<Function>,
    default: () => {}
  },
  // 当前页变化
  handleCurrentChange: {
    type: Function as PropType<Function>,
    default: () => {}
  },
  // 表单参数
  form: {
    type: Object as PropType<any>,
    default: Object
  },
  // 表格的key值
  tableKey: {
    type: [String, Number] as PropType<string | number>,
    default: "0"
  },
  // 表格标题
  tableTitle: { type: String, default: "" },
  // 表格修改
  tableEdit: {
    type: Function as PropType<Function>,
    default: () => {}
  }, // 表格删除
  tableDelete: {
    type: Function as PropType<Function>,
    default: () => {}
  },
  // 刷新时
  onReFresh: {
    type: Function as PropType<Function>,
    default: () => {}
  },
  onSearch: { type: Function as PropType<any> },
  model: { type: Object as PropType<any> }
});

const emit = defineEmits(["changeColumn"]);
const { t, locale } = useI18n();
const route = useRoute();
// 是否全选
const checkAll = ref(true);
// 表格样式大小
const size = ref(props.size);
const isIndeterminate = ref(false);
// 动态行
const dynamicColumns = ref(props.column);
// 过滤是否选中的列
const filterColumns = cloneDeep(props.column).filter(column =>
  isBoolean(column?.hide)
    ? !column.hide
    : !(isFunction(column?.hide) && column?.hide())
);
// 选择当前列
const checkedColumns = ref(getKeyList(cloneDeep(filterColumns), "label"));
const checkColumnList = ref(
  getKeyList(cloneDeep(dynamicColumns.value), "label")
);
const instance = getCurrentInstance()!;
const ruleFormRef = ref<FormInstance>();

/**
 * * 修改表格样式大小
 * @param value 修改样式大小 larger | default | small
 */
const handleTableSizeClick = (value: string) => {
  size.value = value;
};

/**
 * 设置表格列是否全部显示
 * @param val 是否全部显示
 */
const handleCheckAllChange = (val: boolean) => {
  checkedColumns.value = val ? checkColumnList.value : [];
  isIndeterminate.value = false;
  dynamicColumns.value.map(column =>
    val ? (column.hide = false) : (column.hide = true)
  );
};

/**
 * * 选中的表格列---是否显示
 * @param value
 */
const handleCheckedColumnsChange = (value: string[]) => {
  checkedColumns.value = value;
  const checkedCount = value.length;
  checkAll.value = checkedCount === checkColumnList.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < checkColumnList.value.length;
};

/**
 * * 点击是否显示列
 * @param label
 */
const handleCheckColumnListChange = (label: string) => {
  dynamicColumns.value.filter(item => item.label === label)[0].hide = !(
    event.target as any
  ).checked;
};

/**
 * * 是否为固定列
 * @param label
 */
const isFixedColumn = (label: string) => {
  return dynamicColumns.value.filter(item => item.label === label)[0].fixed;
};

/**
 * * 重置自定义表格列字段
 */
const onReset = async () => {
  // 重置列表值
  const list = [];
  // 全选按钮设为true
  checkAll.value = true;
  isIndeterminate.value = false;
  // 当前选中的列
  checkedColumns.value = getKeyList(cloneDeep(filterColumns), "label");
  // ? 重新赋值，拖拽排序不会改变原有值，响应式数据的特性 直接对 ref 或 reactive 创建的变量进行赋值可能不会触发视图的更新
  // ? Proxy 来追踪属性的访问和修改，使用异步方式确保正确更新视图
  checkColumnList.value = [];
  await nextTick(() => {
    checkColumnList.value = getKeyList(filterColumns, "label");
  });

  // checkedColumns 是原有顺序，根据这个顺序重新得到list
  checkedColumns.value.forEach(item => {
    dynamicColumns.value.forEach(column => {
      if (column.label == item) {
        list.push(column);
      }
    });
  });

  emit("changeColumn", list);
};

/** 列展示拖拽排序 */
const rowDrop = (event: any) => {
  nextTick(() => {
    const wrapper: HTMLElement = (
      instance?.proxy?.$refs[`GroupRef${unref(props.tableKey)}`] as any
    ).$el.firstElementChild;
    Sortable.create(wrapper, {
      animation: 300,
      handle: ".drag-btn",
      onEnd: ({ newIndex, oldIndex, item }) => {
        const targetThElem = item;
        const wrapperElem = targetThElem.parentNode as HTMLElement;
        const oldColumn = dynamicColumns.value[oldIndex];
        const newColumn = dynamicColumns.value[newIndex];
        if (oldColumn?.fixed || newColumn?.fixed) {
          // 当前列存在fixed属性 则不可拖拽
          const oldThElem = wrapperElem.children[oldIndex] as HTMLElement;
          if (newIndex > oldIndex) {
            wrapperElem.insertBefore(targetThElem, oldThElem);
          } else {
            wrapperElem.insertBefore(
              targetThElem,
              oldThElem ? oldThElem.nextElementSibling : oldThElem
            );
          }
          return;
        }
        const currentRow = dynamicColumns.value.splice(oldIndex, 1)[0];
        dynamicColumns.value.splice(newIndex, 0, currentRow);
        emit("changeColumn", dynamicColumns.value);
      }
    });
  }).then();
};

/**
 *  重置表单
 * @param formEl
 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  props.onSearch();
};

onMounted(() => {
  watch([() => props.column], () => {
    dynamicColumns.value = props.column;
  });
});
</script>

<template>
  <div class="main">
    <!-- 表单设置，外加插槽 -->
    <el-form
      v-show="tableQueryFormVisible"
      ref="ruleFormRef"
      :inline="true"
      :model="model"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
      @submit="onSearch"
    >
      <slot name="tableForm" />
      <el-form-item>
        <el-button
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          type="primary"
          @click="onSearch"
        >
          {{ $t("buttons.search") }}
        </el-button>
        <el-button
          :icon="useRenderIcon(Refresh)"
          @click="resetForm(ruleFormRef)"
        >
          {{ $t("buttons.rest") }}</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格头部设置 -->
    <div class="w-[99/100] mt-2 px-2 pb-2 bg-bg_color">
      <div class="flex justify-between w-full h-[60px] p-4">
        <!-- 自定义左边头部内容 -->
        <slot name="tableTitle">
          <p class="font-bold truncate">
            {{ tableTitle ? tableTitle : t(route.meta.title) }}
          </p>
        </slot>

        <!-- 自定义表格操作内容 -->
        <slot name="tableOperation">
          <div class="flex items-center justify-around">
            <!-- 插槽内容 -->
            <div class="mr-4">
              <slot name="tableButtons" />
            </div>

            <!-- 表格刷新按钮 -->
            <RefreshIcon
              v-tippy="rendTipProps('刷新')"
              :class="`w-[16px] ${iconClass()}} ${loading ? 'animate-spin' : ''}`"
              @click="onReFresh"
            />
            <el-divider direction="vertical" />

            <!-- 选择表格大小 -->
            <el-dropdown trigger="click">
              <CollapseIcon :class="`w-[16px] ${iconClass()}`" />
              <template #dropdown>
                <el-dropdown-menu class="translation">
                  <el-dropdown-item
                    :style="getDropdownItemStyle(size, 'large')"
                    @click="handleTableSizeClick('large')"
                  >
                    {{ $t("style.larger") }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    :style="getDropdownItemStyle(size, 'default')"
                    @click="handleTableSizeClick('default')"
                  >
                    {{ t("style.default") }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    :style="getDropdownItemStyle(size, 'small')"
                    @click="handleTableSizeClick('small')"
                  >
                    {{ t("style.small") }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-divider direction="vertical" />

            <!-- 表格列设置 -->
            <el-popover
              :popper-style="{ padding: 0 }"
              placement="bottom-start"
              trigger="click"
              width="200"
            >
              <template #reference>
                <SettingIcon
                  v-tippy="rendTipProps('列设置')"
                  :class="`w-[16px] ${iconClass()}`"
                />
              </template>

              <div :class="topClass()">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  class="!-mr-1"
                  label="列展示"
                  @change="handleCheckAllChange"
                />
                <el-button link type="primary" @click="onReset">
                  {{ t("buttons.rest") }}</el-button
                >
              </div>

              <div class="pt-[6px] pl-[11px]">
                <el-scrollbar max-height="36vh">
                  <el-checkbox-group
                    :ref="`GroupRef${unref(props.tableKey)}`"
                    :modelValue="checkedColumns"
                    @change="handleCheckedColumnsChange"
                  >
                    <el-space
                      :alignment="'flex-start'"
                      :size="0"
                      direction="vertical"
                    >
                      <div
                        v-for="(item, index) in checkColumnList"
                        :key="index"
                        class="flex items-center"
                      >
                        <DragIcon
                          :class="`drag-btn w-[16px] mr-2 ${isFixedColumn(item) ? '!cursor-no-drop' : '!cursor-grab'}`"
                          @mouseenter.prevent="rowDrop"
                        />
                        <el-checkbox
                          :key="index"
                          :label="item"
                          :value="item"
                          @change="handleCheckColumnListChange(item)"
                        >
                          <span
                            :title="item"
                            class="inline-block w-[120px] truncate hover:text-text_color_primary"
                          >
                            {{ item }}
                          </span>
                        </el-checkbox>
                      </div>
                    </el-space>
                  </el-checkbox-group>
                </el-scrollbar>
              </div>
            </el-popover>
          </div>
        </slot>
      </div>
      <slot name="tableSelect" />
      <pure-table
        ref="tableRef"
        :adaptiveConfig="{ offsetBottom: 108 }"
        :columns="column"
        :data="dataList"
        :header-cell-style="cellHeaderStyle"
        :loading="loading"
        :pagination="pagination"
        :paginationSmall="size === 'small'"
        :size="size"
        adaptive
        align-whole="center"
        border
        row-key="id"
        stripe
        table-layout="fixed"
        v-bind="$attrs"
        @page-size-change="handleSizeChange"
        @page-current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
      >
        <template
          v-for="item in column"
          :key="item.prop"
          v-slot:[item.slot]="scope"
          v-bind="item"
        >
          <slot :name="item.slot" v-bind="scope" />
          <slot v-if="item.slot === 'operation'" name="operation">
            <el-button
              :icon="EditPen"
              link
              type="warning"
              @click="tableEdit(scope)"
              >修改</el-button
            >
            <el-popconfirm
              :title="t('table.popConfirmTitle')"
              @confirm="tableDelete(scope)"
            >
              <template #reference>
                <el-button :icon="DeleteFilled" link type="danger"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </slot>
        </template>
      </pure-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
