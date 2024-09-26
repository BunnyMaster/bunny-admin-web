import { defineFakeRoute } from "vite-plugin-fake-server/client";
import en from "./i18n/en";
import zh from "./i18n/zh";

export default defineFakeRoute([
  {
    url: "/mock/getI18n",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: { zh, en, local: "zh" }
      };
    }
  }
]);
