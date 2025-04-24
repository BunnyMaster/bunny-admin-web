// 添加或者修改表单元素
export interface FormItemProps {
  // 用户名
  username: string;
  // 昵称
  nickname: string;
  // 邮箱
  email: string;
  // 手机号
  phone: string;
  // 密码
  password: string;
  // 头像
  avatar: string;
  // 性别
  sex: number;
  // 个人描述
  summary: string;
  // 状态
  status: boolean;
  // 部门
  deptId: string[];
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}

// 树形结构
export interface Tree {
  id: number;
  deptName: string;
  highlight?: boolean;
  children?: Tree[];
}
