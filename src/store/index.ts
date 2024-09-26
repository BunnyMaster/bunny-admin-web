import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const store = createPinia();

export function setupStore(app: App<Element>) {
  store.use(piniaPluginPersistedState);
  app.use(store);
}

export { store };
