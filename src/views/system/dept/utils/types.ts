// 添加或者修改表单元素
export interface FormItemProps {
	// 父级id
	parentId: string;
	// 管理者id
	manager: string[];
	// 部门名称
	deptName: string;
	// 部门简介
	summary: string;
	// 备注信息
	remarks: string;
}

// 添加或修改表单Props
export interface FormProps {
	formInline: FormItemProps;
}
