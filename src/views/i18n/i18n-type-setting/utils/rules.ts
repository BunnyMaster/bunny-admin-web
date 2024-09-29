import type { FormRules } from 'element-plus';
import { reactive } from 'vue';

interface AddRuleForm {
	languageName: string;
	summary: string;
}

// 添加规则
export const addRules = reactive<FormRules<AddRuleForm>>({
	languageName: [{ required: true, message: '填写语言名称(例如：zh)', trigger: 'blur' }],
});
