// 添加或者修改表单元素
export interface FormItemProps {
	keyName: string;
	translation: string;
	typeId: string;
}

// 添加或修改表单Props
export interface FormProps {
	formInline: FormItemProps;
}
