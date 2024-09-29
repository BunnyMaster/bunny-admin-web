// 添加或者修改表单元素
export interface FormItemProps {
	typeName: string;
	summary: string;
	isDefault: boolean;
}

// 添加或修改表单Props
export interface FormProps {
	formInline: FormItemProps;
}
