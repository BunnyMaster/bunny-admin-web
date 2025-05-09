<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import TableIsDefaultTag from '@/components/Table/TableIsDefaultTag.vue';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { userI18nTypeStore } from '@/store/i18n/i18nType';
import { columns, onAdd, onDelete, onSearch, onUpdate } from '@/views/i18n/i18n-type-setting/utils';
import PureTable from '@pureadmin/table';
import { onMounted, ref } from 'vue';
import Delete from '~icons/ep/delete';
import EditPen from '~icons/ep/edit-pen';
import Refresh from '~icons/ep/refresh';
import AddFill from '~icons/ri/add-circle-line';

defineOptions({ name: 'I18nType' });

const tableRef = ref();
const formRef = ref();
const i18nTypeStore = userI18nTypeStore();

const resetForm = async (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="i18nTypeStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
      <el-form-item :label="$t('i18n_typeName')" prop="typeName">
        <el-input v-model="i18nTypeStore.form.typeName" :placeholder="`${$t('input')}${$t('i18n_typeName')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('i18n_summary')" prop="summary">
        <el-input v-model="i18nTypeStore.form.summary" :placeholder="`${$t('input')}${$t('i18n_summary')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item>
        <el-button :icon="useRenderIcon('ri/search-line')" :loading="i18nTypeStore.loading" type="primary" @click="onSearch">
          {{ $t('search') }}
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <PureTableBar :columns="columns" :title="$t('i18n_type')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
      <template #buttons>
        <el-button :icon="useRenderIcon(AddFill)" plain type="success" @click="onAdd">
          {{ $t('addNew') }}
        </el-button>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 45 }"
          :columns="dynamicColumns"
          :data="i18nTypeStore.datalist"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }"
          :loading="i18nTypeStore.loading"
          :size="size"
          adaptive
          align-whole="center"
          border
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
        >
          <template #isDefault="{ row }">
            <TableIsDefaultTag :status="row.isDefault" />
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
            <el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)">
              {{ $t('modify') }}
            </el-button>
            <el-popconfirm :title="`${$t('delete')} ${row.typeName}?`" @confirm="onDelete(row)">
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
