// 添加或者修改表单元素
export interface FormItemProps {
	// 邮箱
	email: string;
	// 密码
	password: string;
	// Host地址
	host: string;
	// 端口号
	port: number;
	// 邮箱协议
	smtpAgreement: string;
	// 是否为默认邮件
	isDefault: boolean;
}

// 添加或修改表单Props
export interface FormProps {
	formInline: FormItemProps;
}
