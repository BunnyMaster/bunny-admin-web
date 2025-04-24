// 添加或者修改表单元素
export interface FormItemProps {
  // 任务名称
  jobName: string;
  // 任务分组
  jobGroup: string;
  // 执行任务类名
  jobClassName: string;
  // 执行任务core表达式
  cronExpression: string;
  // 触发器名称
  triggerName: string;
  // 执行结果
  executeResult: any;
  // 执行时间
  duration: number;
}

// 添加或修改表单Props
export interface FormProps {
  formInline: FormItemProps;
}
