interface FormItemProps {
	/** 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）*/
	id: string;
	menuType: number;
	higherMenuOptions: Record<string, unknown>[];
	parentId: number;
	title: string;
	name: string;
	path: string;
	component: string;
	rank: number;
	redirect: string;
	icon: string;
	enterTransition: string;
	leaveTransition: string;
	frameSrc: string;
	frameLoading: boolean;
	keepAlive: boolean;
	hiddenTag: boolean;
	fixedTag: boolean;
	showLink: boolean;
	showParent: boolean;
}

interface FormProps {
	formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
