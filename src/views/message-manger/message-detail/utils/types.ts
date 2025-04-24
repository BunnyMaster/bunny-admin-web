// 添加或者修改表单元素
export interface FormItemProps {
  // 消息标题
  title: string;
  // 接收人用户ID
  receivedUserIds: string[];
  // 发送人用户ID
  sendUserId: string;
  // 消息类型
  messageType: string;
  // 消息内容
  content: string;
  // 消息等级
  level: string;
  // 消息等级类型
  extra: string;
  // 编辑器类型
  editorType: string;
  // 0:未读 1:已读
  status: boolean;
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}
