import { $t } from '@/plugins/i18n';
import { ElTag, ElText } from 'element-plus';

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
  { label: $t('receivedUserNickname'), prop: 'receivedUserNickname', slot: 'receivedUserNickname', minWidth: 150 },
  // 消息类型
  { label: $t('messageType'), prop: 'messageType', slot: 'messageType', minWidth: 130 },
  // 编辑器类型
  {
    label: $t('editorType'),
    prop: 'editorType',
    minWidth: 130,
    formatter({ editorType }) {
      return editorType === 'rich' ? <ElText type={'info'}>{editorType}</ElText> : <ElText type={'warning'}>{editorType}</ElText>;
    },
  },
  // 封面
  { label: $t('cover'), prop: 'cover', slot: 'cover', minWidth: 80 },
  // 消息等级
  {
    label: $t('level'),
    prop: 'level',
    formatter({ level }) {
      return (
        level && (
          <ElTag type={level} effect={'plain'} round>
            {$t(level)}
          </ElTag>
        )
      );
    },
    minWidth: 130,
  },
  // 消息等级详情
  { label: $t('extra'), prop: 'extra', slot: 'extra', minWidth: 230 },
  // 0:未读 1:已读
  {
    label: $t('status'),
    prop: 'status',
    formatter({ status }) {
      return status ? (
        <ElTag type={'info'} effect={'plain'}>
          {$t('readAlready')}
        </ElTag>
      ) : (
        <ElTag type={'danger'} effect={'plain'}>
          {$t('unread')}
        </ElTag>
      );
    },
    minWidth: 80,
  },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true, minWidth: 160 },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true, minWidth: 160 },
  { label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', minWidth: 130 },
  { label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', minWidth: 130 },
];
