// 添加或者修改表单元素

export interface FormItemProps {
	// 用户Id
	userId: number;
	// 用户名
	username: string;
	// 登录token
	token: string;
	// 登录Ip
	ipAddress: string;
	// 登录Ip归属地
	ipRegion: string;
	// 登录时代理
	userAgent: string;
	// 操作类型
	type: string;
	// 标识客户端是否是通过Ajax发送请求的
	xRequestedWith: string;
	// 用户代理的品牌和版本
	secChUa: string;
	// 用户代理是否在手机设备上运行
	secChUaMobile: string;
	// 用户代理的设备模型
	secChUaModel: string;
	// 用户代理的底层操作系统/平台
	secChUaPlatform: string;
}

// 添加或修改表单Props
export interface FormProps {
	formInline: FormItemProps;
}
