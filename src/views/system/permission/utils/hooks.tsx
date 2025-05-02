import { addDialog } from '@/components/ReDialog/index';
import PermissionFromDialog from '@/views/system/permission/components/permission-from-dialog.vue';
import { usePermissionStore } from '@/store/system/power';
import { h, reactive, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/permission/utils/types';
import { $t } from '@/plugins/i18n';
import { handleTree } from '@pureadmin/utils';
import { powerCascadeProps } from '@/views/system/permission/utils/columns';
import { ElCascader, ElForm, ElFormItem } from 'element-plus';

export const formRef = ref();
// 批量点击id列表
export const powerIds = ref([]);
const powerStore = usePermissionStore();

/** 搜索初始化权限 */
export async function onSearch() {
  powerStore.loading = true;
  await powerStore.fetchPermissionPage();
  powerStore.loading = false;
}

/** 添加权限 */
export function onAdd(parentId = 0) {
  addDialog({
    title: `${$t('addNew')}${$t('power')}`,

    props: {
      formInline: {
        parentId,
        powerCode: undefined,
        powerName: undefined,
        requestUrl: undefined,
        requestMethod: undefined,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () =>
      h(PermissionFromDialog, {
        ref: formRef,
        formInline: {
          parentId,
          powerCode: undefined,
          powerName: undefined,
          requestUrl: undefined,
          requestMethod: undefined,
        },
      }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await powerStore.addPermission(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/* 更新权限 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')}${$t('power')}`,

    props: {
      formInline: {
        parentId: row.parentId,
        powerCode: row.powerCode,
        powerName: row.powerName,
        requestUrl: row.requestUrl,
        requestMethod: row.requestMethod,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () =>
      h(PermissionFromDialog, {
        ref: formRef,
        formInline: {
          parentId: row.parentId,
          powerCode: row.powerCode,
          powerName: row.powerName,
          requestUrl: row.requestUrl,
          requestMethod: row.requestMethod,
        },
      }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;
        // 请求方法是否存在，不存在就为空
        form.requestMethod = form.requestMethod ? form.requestMethod : '';
        const result = await powerStore.editPermission({ ...form, id: row.id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除权限 */
export const onDelete = async (row: any) => {
  const id = row.id;

  // 是否确认删除
  const result = await messageBox({
    title: $t('confirmDelete'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('confirmDelete'),
  });
  if (!result) return;

  // 删除数据
  await powerStore.removePermission([id]);
  await onSearch();
};

/** 批量删除 */
export const onDeleteBatch = async () => {
  // 是否确认删除
  const result = await messageBox({
    title: $t('confirmDelete'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('cancel_delete'),
  });
  if (!result) return;

  // 删除数据
  const ids = powerIds.value;
  await powerStore.removePermission(ids);
  await onSearch();
};

/** 批量更新父级id */
export const onUpdateBatchParent = async () => {
  const formUpdateParentRef = ref();
  const form = reactive({
    ids: powerIds.value,
    parentId: undefined,
  });

  await powerStore.loadPermissionList();
  addDialog({
    title: $t('update_batches_parent'),

    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => (
      <ElForm ref={formUpdateParentRef} model={form}>
        <ElFormItem
          rules={{ required: true, message: `${$t('input')}${$t('power_parentId')}`, trigger: 'blur' }}
          label={$t('menuIcon_iconName')}
          prop={'parentId'}
        >
          <ElCascader
            v-model={form.parentId}
            options={handleTree(powerStore.allPowerList)}
            props={powerCascadeProps}
            class={'w-full'}
            clearable
            filterable
            show-all-levels
          />
        </ElFormItem>
      </ElForm>
    ),
    beforeSure: (done, _) => {
      formUpdateParentRef.value.validate(async (valid: any) => {
        if (!valid) return;

        const result = await powerStore.updatePermissionListByParentId(form);
        if (!result) return;

        done();
        await onSearch();
      });
    },
  });
};
