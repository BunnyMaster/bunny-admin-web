import type { VNode } from 'vue';
import { isFunction } from '@pureadmin/utils';
import { ElMessage, ElMessageBox, type MessageHandler } from 'element-plus';
import type { BaseResult } from '@/api/service/types';

type messageStyle = 'el' | 'antd';
type messageTypes = 'info' | 'success' | 'warning' | 'error';

interface MessageParams {
	/** 消息类型，可选 `info` 、`success` 、`warning` 、`error` ，默认 `info` */
	type?: messageTypes;
	/** 自定义图标，该属性会覆盖 `type` 的图标 */
	icon?: any;
	/** 是否将 `message` 属性作为 `HTML` 片段处理，默认 `false` */
	dangerouslyUseHTMLString?: boolean;
	/** 消息风格，可选 `el` 、`antd` ，默认 `antd` */
	customClass?: messageStyle;
	/** 显示时间，单位为毫秒。设为 `0` 则不会自动关闭，`element-plus` 默认是 `3000` ，平台改成默认 `2000` */
	duration?: number;
	/** 是否显示关闭按钮，默认值 `false` */
	showClose?: boolean;
	/** 文字是否居中，默认值 `false` */
	center?: boolean;
	/** `Message` 距离窗口顶部的偏移量，默认 `20` */
	offset?: number;
	/** 设置组件的根元素，默认 `document.body` */
	appendTo?: string | HTMLElement;
	/** 合并内容相同的消息，不支持 `VNode` 类型的消息，默认值 `false` */
	grouping?: boolean;
	/** 关闭时的回调函数, 参数为被关闭的 `message` 实例 */
	onClose?: Function | null;
}

// 消息盒
interface MessageBox {
	message: string | undefined;
	title: string | undefined;
	confirmMessage: any;
	cancelMessage: any;
	showMessage: boolean;
}

/** 用法非常简单，参考 src/views/components/message/index.vue 文件 */

/**
 * `Message` 消息提示函数
 */
export const message = (message: string | VNode | (() => VNode), params?: MessageParams): MessageHandler => {
	if (!params) {
		return ElMessage({
			message,
			customClass: 'pure-message',
		});
	} else {
		const {
			icon,
			type = 'info',
			dangerouslyUseHTMLString = false,
			customClass = 'antd',
			duration = 2000,
			showClose = false,
			center = false,
			offset = 20,
			appendTo = document.body,
			grouping = false,
			onClose,
		} = params;

		return ElMessage({
			message,
			type,
			icon,
			dangerouslyUseHTMLString,
			duration,
			showClose,
			center,
			offset,
			appendTo,
			grouping,
			// 全局搜 pure-message 即可知道该类的样式位置
			customClass: customClass === 'antd' ? 'pure-message' : '',
			onClose: () => (isFunction(onClose) ? onClose() : null),
		});
	}
};

/**
 * 关闭所有 `Message` 消息提示函数
 */
export const closeAllMessage = (): void => ElMessage.closeAll();

/**
 * 仓库消息展示
 * @param result
 */
export const storeMessage = (result: BaseResult<any>) => {
	if (result.code !== 200) {
		message(result.message, { type: 'warning' });
		return false;
	}
	message(result.message, { type: 'success' });
	return true;
};

const defaultBoxOption: MessageBox = {
	showMessage: false,
	message: '',
	title: '',
	confirmMessage: undefined,
	cancelMessage: undefined,
};

/**
 * 消息弹窗确认
 * @param type
 * @param option
 */
export const messageBox = async (option: MessageBox = defaultBoxOption, type: any = 'warning') => {
	return ElMessageBox.confirm(option.message, option.title, {
		confirmButtonText: '确认',
		cancelButtonText: '返回',
		type,
		draggable: true,
		overflow: true,
	})
		.then(() => {
			option.showMessage && ElMessage({ type: 'success', message: option.confirmMessage });
			return true;
		})
		.catch(() => {
			ElMessage({ type: 'warning', message: option.cancelMessage });
			return false;
		});
};
