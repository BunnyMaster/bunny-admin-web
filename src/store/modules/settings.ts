import { defineStore } from 'pinia';
import { getConfig, type setType, store } from '../utils';

export const useSettingStore = defineStore({
	id: 'pure-setting',
	state: (): setType => ({
		title: getConfig().Title,
		fixedHeader: getConfig().FixedHeader,
		hiddenSideBar: getConfig().HiddenSideBar,
	}),
	getters: {
		getTitle(state) {
			return state.title;
		},
		getFixedHeader(state) {
			return state.fixedHeader;
		},
		getHiddenSideBar(state) {
			return state.hiddenSideBar;
		},
	},
	actions: {
		CHANGE_SETTING({ key, value }) {
			if (Reflect.has(this, key)) {
				this[key] = value;
			}
		},
		changeSetting(data) {
			this.CHANGE_SETTING(data);
		},
	},
});

export function useSettingStoreHook() {
	return useSettingStore(store);
}
