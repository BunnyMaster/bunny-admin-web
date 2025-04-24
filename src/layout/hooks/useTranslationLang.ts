import { useNav } from './useNav';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { onBeforeMount, type Ref, watch } from 'vue';

export function useTranslationLang(ref?: Ref) {
  const { $storage, changeTitle, handleResize } = useNav();
  const { locale } = useI18n();
  const route = useRoute();

  function translation(value: string) {
    $storage.locale = { locale: value };
    locale.value = value;
    ref && handleResize(ref.value);
  }

  watch(
    () => locale.value,
    () => {
      changeTitle(route.meta);
    }
  );

  onBeforeMount(() => {
    locale.value = $storage.locale?.locale ?? 'zh';
  });

  return { route, locale, translation };
}
