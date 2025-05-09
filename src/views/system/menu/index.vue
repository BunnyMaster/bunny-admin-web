<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { userMenuStore } from '@/store/system/menu';
import { clearAllRolesSelect, columns, mergeArgs, onAdd, onDelete, onSearch, onUpdate, selectIds, tableRef } from '@/views/system/menu/utils';
import PureTable from '@pureadmin/table';
import { FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';
import Delete from '~icons/ep/delete';
import EditPen from '~icons/ep/edit-pen';
import Refresh from '~icons/ep/refresh';
import AddFill from '~icons/ri/add-circle-line';

defineOptions({ name: 'MenuManger' });

const menuStore = userMenuStore();
const routerStore = userMenuStore();
const formRef = ref();

/* 表单重置 */
const resetForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

/* 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
  selectIds.value = rows.map((row: any) => row.id);
};

/* 更新菜单排序 */
const onChangeMenuRank = async (row: any) => {
  const data = mergeArgs(row);
  await menuStore.editRouter(data);
  await onSearch();
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="routerStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="routerStore.form.title" :placeholder="$t('input')" class="!w-[180px]" clearable />
      </el-form-item>

      <el-form-item>
        <el-button :icon="useRenderIcon('ri/search-line')" :loading="routerStore.loading" type="primary" @click="onSearch">
          {{ $t('search') }}
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      :columns="columns"
      :isExpandAll="false"
      :tableRef="tableRef?.getTableRef()"
      title="菜单管理"
      @fullscreen="tableRef?.setAdaptive()"
      @refresh="onSearch"
    >
      <template #buttons>
        <!-- 添加菜单 -->
        <el-button :icon="useRenderIcon(AddFill)" plain type="success" @click="onAdd()">
          {{ $t('addNew') }}
        </el-button>

        <!-- 清除选中所以角色 -->
        <el-button :disabled="!(selectIds.length > 0)" :icon="useRenderIcon('ic:baseline-clear')" plain type="danger" @click="clearAllRolesSelect()">
          {{ $t('clearAllRolesSelect') }}
        </el-button>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :columns="dynamicColumns"
          :data="routerStore.datalist"
          :header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
          :loading="routerStore.loading"
          :size="size"
          adaptive
          align-whole="center"
          border
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          @row-dblclick="(row) => onUpdate(row)"
          @selection-change="onSelectionChange"
        >
          <template #rank="{ row }">
            <el-input v-model="row.rank" :max="9999" :min="1" type="number" @blur="onChangeMenuRank(row)" />
          </template>

          <template #createUser="{ row }">
            <el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
              {{ row.createUsername }}
            </el-button>
          </template>

          <template #updateUser="{ row }">
            <el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
              {{ row.updateUsername }}
            </el-button>
          </template>

          <template #operation="{ row }">
            <!-- 修改 -->
            <el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)">
              {{ $t('modify') }}
            </el-button>

            <!-- 新增 -->
            <el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd(row.id)">
              {{ $t('addNew') }}
            </el-button>

            <!-- 删除操作 -->
            <el-popconfirm :title="`${$t('delete')} ${$t(row.title)}?`" @confirm="onDelete(row)">
              <template #reference>
                <el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
                  {{ $t('delete') }}
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table__inner-wrapper::before) {
  height: 0;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
