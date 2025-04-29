import { $t } from '@/plugins/i18n';
import { computed, reactive } from 'vue';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';

// 表格列
export const columns: TableColumnList = [
  { type: 'selection', align: 'left' },
  { type: 'index', index: (index: number) => index + 1, label: $t('index'), width: 60 },
  // 角色代码
  { label: $t('role_roleCode'), prop: 'roleCode' },
  // 描述
  { label: $t('role_description'), prop: 'description' },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true },
  {
    label: $t('table.createUser'),
    prop: 'createUser',
    cellRenderer({ row }) {
      return (
        row.createUser && (
          <el-button link type="primary" onClick={() => selectUserinfo(row.createUser)}>
            {row.createUsername}
          </el-button>
        )
      );
    },
    width: 130,
  },
  {
    label: $t('table.updateUser'),
    prop: 'updateUser',
    cellRenderer({ row }) {
      return (
        row.updateUser && (
          <el-button link type="primary" onClick={() => selectUserinfo(row.updateUser)}>
            {row.updateUsername}
          </el-button>
        )
      );
    },
    width: 130,
  },
  { label: $t('table.operation'), fixed: 'right', width: 240, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
  // 角色代码
  roleCode: [{ required: true, message: `${$t('input')}${$t('role_roleCode')}`, trigger: 'blur' }],
  // 描述
  description: [{ required: true, message: `${$t('input')}${$t('role_description')}`, trigger: 'blur' }],
});

// 权限显示图标类名
export const iconClass = computed(() => {
  return [
    'w-[22px]',
    'h-[22px]',
    'flex',
    'justify-center',
    'items-center',
    'outline-hidden',
    'rounded-[4px]',
    'cursor-pointer',
    'transition-colors',
    'hover:bg-[#0000000f]',
    'dark:hover:bg-[#ffffff1f]',
    'dark:hover:text-[#ffffffd9]',
  ];
});
