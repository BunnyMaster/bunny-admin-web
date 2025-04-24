// 添加或者修改表单元素
export interface FormItemProps {
  // 模板名称
  templateName: string;
  // 模板名称
  emailUser: string;
  // 主题
  subject: string;
  // 是否默认
  isDefault: boolean;
  // 邮件内容
  body: string;
  // 邮件类型
  type: string;
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}
