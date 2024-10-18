// 添加或者修改表单元素
export interface FormItemProps {
	// 用户Id
	userId: number;
	// 用户名
	username: string;
	// 登录token
	token: string;
	// 登录Ip
	ip: string;
	// 登录Ip地点
	ipAddress: string;
	// 登录时代理
	userAgent: string;
}

// 添加或修改表单Props
export interface FormProps {
	formInline: FormItemProps;
}
