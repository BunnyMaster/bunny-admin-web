const Layout = () => import('@/layout/index.vue');

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'menus.pureLogin',
      showLink: false,
      rank: 101,
    },
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      title: 'status.pureLoad',
      showLink: false,
      rank: 102,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/layout/redirect.vue'),
      },
    ],
  },
  {
    path: '/account-settings',
    name: 'AccountSettings',
    component: () => import('@/views/account-settings/index.vue'),
    meta: {
      title: 'buttons.accountSettings',
      showLink: false,
      rank: 103,
    },
  },
  {
    path: '/message-detail',
    name: 'MessageDetail',
    component: () => import('@/views/message-manger/message-detail/index.vue'),
    meta: { title: 'message', showLink: false, rank: 104 },
    children: [
      {
        path: '/message-detail/:messageType',
        name: 'MessageDetailByMessageType',
        component: () => import('@/views/message-manger/message-detail/components/detail-type.vue'),
        meta: { title: 'message', showLink: false },
      },
      {
        path: '/message-detail/:messageType/:messageId',
        name: 'MessageDetailByMessageId',
        component: () => import('@/views/message-manger/message-detail/components/detail-message-id.vue'),
        meta: { title: 'message', showLink: false },
      },
    ],
  },
] satisfies Array<RouteConfigsTable>;
