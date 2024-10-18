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
	// 用户代理的底层平台架构
	secChUaArch: string;
	// 用户代理的底层CPU架构位数
	secChUaBitness: string;
	// 用户代理是否在手机设备上运行
	secChUaMobile: string;
	// 用户代理的设备模型
	secChUaModel: string;
	// 用户代理的底层操作系统/平台
	secChUaPlatform: string;
	// 用户代理的底层操作系统版本
	secChUaPlatformVersion: string;
	// 客户端设备像素比
	contentDpr: string;
	// 客户端RAM内存的近似值
	deviceMemory: string;
	// 客户端设备像素比
	dpr: string;
	// 布局视口宽度
	viewportWidth: string;
	// 所需资源宽度
	width: string;
	// 客户端连接到服务器的近似带宽
	downlink: string;
	// 有效连接类型
	ect: string;
	// 应用层往返时间
	rtt: string;
}

// 添加或修改表单Props
export interface FormProps {
	formInline: FormItemProps;
}
