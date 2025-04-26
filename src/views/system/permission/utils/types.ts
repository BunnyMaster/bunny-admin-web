// 添加或者修改表单元素
export interface FormItemProps {
  // 父级id
  parentId: number;
  // 权限编码
  powerCode: string;
  // 权限名称
  powerName: string;
  // 请求路径
  requestUrl: string;
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}
