import { $t } from '@/plugins/i18n';
import { ElTag, type FormRules } from 'element-plus';
import { reactive } from 'vue';

// 表格列
export const columns: TableColumnList = [
  { type: 'selection', align: 'left' },
  { type: 'index', index: (index: number) => index + 1, label: '序号', minWidth: 60 },
  // 消息标题
  { label: $t('title'), prop: 'title', minWidth: 150 },
  // 消息简介
  { label: $t('summary'), prop: 'summary', minWidth: 200 },
  // 发送人昵称
  { label: $t('sendNickname'), prop: 'sendNickname', slot: 'sendNickname', minWidth: 130 },
  // 接受人昵称
  { label: $t('receivedUserNickname'), prop: 'receivedUserNickname', minWidth: 150 },
  // 消息类型
  { label: $t('messageType'), prop: 'messageType', slot: 'messageType', minWidth: 130 },
  // 编辑器类型
  { label: $t('editorType'), prop: 'editorType', minWidth: 105 },
  // 封面
  { label: $t('cover'), prop: 'cover', slot: 'cover', minWidth: 80 },
  // 消息等级
  {
    label: $t('level'),
    prop: 'level',
    formatter({ level }) {
      return (
        <ElTag type={level} effect={'plain'} round>
          {$t(level)}
        </ElTag>
      );
    },
    minWidth: 130,
  },
  // 消息等级详情
  { label: $t('extra'), prop: 'extra', slot: 'extra', minWidth: 230 },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true, minWidth: 160 },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true, minWidth: 160 },
  { label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', minWidth: 130 },
  { label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', minWidth: 130 },
  { label: $t('table.operation'), fixed: 'right', minWidth: 160, slot: 'operation' },
];

// 添加规则
export const rules = reactive<FormRules>({
  // 消息标题
  title: [{ required: true, message: `${$t('input')}${$t('title')}`, trigger: 'blur' }],
  // 发送人用户ID
  sendUserId: [{ required: true, message: `${$t('input')}${$t('sendUserId')}`, trigger: 'blur' }],
  // 消息类型
  messageTypeId: [{ required: true, message: `${$t('input')}${$t('messageType')}`, trigger: 'blur' }],
  // 消息内容
  content: [{ required: true, message: `${$t('input')}${$t('content')}`, trigger: 'blur' }],
  // 编辑器类型
  editorType: [{ required: true, message: `${$t('input')}${$t('editorType')}`, trigger: 'blur' }],
});

/** 编辑器类型 */
export const editorTypeList = [
  { label: $t('markdown'), value: 'markdown' },
  { label: $t('richText'), value: 'rich' },
];
