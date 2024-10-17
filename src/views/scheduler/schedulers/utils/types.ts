// 添加或者修改表单元素
export interface FormItemProps {
	// 任务名称
	jobName: string;
	// 任务分组
	jobGroup: string;
	// 任务详情
	description: string;
	// 任务类名称
	jobClassName: string;
	// corn表达式
	cronExpression: string;
}

// 添加或修改表单Props
export interface FormProps {
	formInline: FormItemProps;
}
