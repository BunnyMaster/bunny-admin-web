// 添加或者修改表单元素
export interface FormItemProps {
  // 角色代码
  roleCode: string;
  // 描述
  description: string;
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}
