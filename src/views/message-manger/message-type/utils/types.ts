// 添加或者修改表单元素
export interface FormItemProps {
  // 1:启用 0:禁用
  status: boolean;
  // 消息名称
  messageName: string;
  // 消息类型
  messageType: string;
  // 消息备注
  summary: string;
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}
