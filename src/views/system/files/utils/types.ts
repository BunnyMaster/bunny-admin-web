// 添加或者修改表单元素
export interface FormItemProps {
  // 文件的名称
  filename: string;
  // 文件在服务器上的存储路径
  filepath: string;
  // 文件的MIME类型
  fileType: string;
  // 下载数量
  downloadCount: number;
  // 文件内容
  files: any;
  // 是否是上传
  isUpload: boolean;
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}
