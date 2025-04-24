// 添加或者修改表单元素
export interface FormItemProps {
  // 分组名称
  groupName: string;
  // 分组详情
  description: string;
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}
