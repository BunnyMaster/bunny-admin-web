import { $t } from '@/plugins/i18n';

export interface ListItem {
	avatar: string;
	title: string;
	datetime: string;
	type: string;
	description: string;
	status?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
	extra?: string;
}

export interface TabItem {
	key: string;
	name: string;
	list: ListItem[];
	emptyText: string;
}

// {
//   avatar: 'https://xiaoxian521.github.io/hyperlink/svg/smile1.svg',
//     title: '小铭 评论了你',
//   description: '诚在于心，信在于行，诚信在于心行合一。',
//   datetime: '今天',
//   type: '2',
// },
export const noticesData: TabItem[] = [
	{
		key: '1',
		name: $t('status.pureNotify'),
		list: [],
		emptyText: $t('status.pureNoNotify'),
	},
	{
		key: '2',
		name: $t('status.pureMessage'),
		list: [],
		emptyText: $t('status.pureNoMessage'),
	},
	{
		key: '3',
		name: $t('status.pureTodo'),
		list: [],
		emptyText: $t('status.pureNoTodo'),
	},
];
