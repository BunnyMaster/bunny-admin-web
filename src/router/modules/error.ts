import { $t } from '@/plugins/i18n';

export default {
  path: '/Error',
  redirect: '/Error/403',
  meta: {
    icon: 'ri:information-line',
    showLink: false,
    title: 'menus.pureAbnormal',
    rank: 9,
  },
  children: [
    {
      path: '/Error/403',
      name: '403',
      component: () => import('@/components/Error/403.vue'),
      meta: {
        title: $t('menus.pureFourZeroOne'),
      },
    },
    {
      path: '/Error/404',
      name: '404',
      component: () => import('@/components/Error/404.vue'),
      meta: {
        title: $t('menus.pureFourZeroFour'),
      },
    },
    {
      path: '/Error/500',
      name: '500',
      component: () => import('@/components/Error/500.vue'),
      meta: {
        title: $t('menus.pureFive'),
      },
    },
  ],
} satisfies RouteConfigsTable;
