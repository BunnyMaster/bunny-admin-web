import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { $t } from '@/plugins/i18n';
import { userMenuStore } from '@/store/system/menu';
import { messageBox } from '@/utils/message';
import { mergeArgs } from '@/views/system/menu/utils';
import { isAllEmpty } from '@pureadmin/utils';
import { ElLink, ElTag, type FormRules } from 'element-plus';
import { h, reactive } from 'vue';

const menuStore = userMenuStore();

/* 标签栏菜单类型匹配 */
const getMenuType = (type: number, text: boolean = false): any => {
  switch (type) {
    case 0:
      return text ? $t('menu') : 'primary';
    case 1:
      return text ? 'iframe' : 'warning';
    case 2:
      return text ? $t('externalLink') : 'danger';
  }
};

/** 格式化菜单选项 */
export const formatHigherMenuOptions = (treeList: any) => {
  if (!treeList || !treeList.length) return;
  const newTreeList = [];
  for (let i = 0; i < treeList.length; i++) {
    treeList[i].title = $t(treeList[i].title);
    formatHigherMenuOptions(treeList[i].children);
    newTreeList.push(treeList[i]);
  }
  return newTreeList;
};

/* 更新是否显示菜单 */
const onChangeShowLink = async (row: any) => {
  // 是否确认
  let result = await messageBox({
    title: $t('confirm_update_status'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('cancel'),
  });
  if (!result) return;

  // 确认后进行修改
  row.showLink = !row.showLink;
  const data = mergeArgs(row);
  await menuStore.editRouter(data);
};

export const columns: TableColumnList = [
  { type: 'selection', align: 'left' },
  // 显示标题
  {
    label: $t('menuName'),
    prop: 'title',
    align: 'left',
    cellRenderer: ({ row }) => (
      <>
        <span class="inline-block mr-1">
          {h(useRenderIcon(row.icon), {
            style: { paddingTop: '1px' },
          })}
        </span>
        <span>{$t(row.title)}</span>
      </>
    ),
    width: 170,
  },
  // 菜单类型
  {
    label: $t('menuType'),
    prop: 'menuType',
    width: 130,
    cellRenderer: ({ row, props }) => (
      <ElTag size={props.size} type={getMenuType(row.menuType)} effect="plain">
        {getMenuType(row.menuType, true)}
      </ElTag>
    ),
  },
  { label: $t('routerPath'), prop: 'path', width: 230 },
  // 组件路径
  {
    label: $t('componentPath'),
    prop: 'component',
    formatter: ({ path, component }) => (isAllEmpty(component) ? path : component),
    width: 200,
  },
  // 路由等级
  { label: $t('sort'), prop: 'rank', width: 80, slot: 'rank' },
  // 是否i按时
  {
    label: $t('visible'),
    prop: 'showLink',
    cellRenderer: ({ row }) => (
      <ElLink underline={false} onClick={() => onChangeShowLink(row)}>
        {row.showLink ? $t('show') : $t('hidden')}
      </ElLink>
    ),
  },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
  { label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
  { label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
  { label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
  title: [{ required: true, message: $t('menuNameTip'), trigger: 'blur' }],
  name: [{ required: true, message: $t('routerNameTip'), trigger: 'blur' }],
  path: [{ required: true, message: $t('routerPathTip'), trigger: ['blur', 'change'], pattern: /^\/.*/ }],
});
