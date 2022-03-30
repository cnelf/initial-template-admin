import Layout from '@/layout/index.vue';
export const baseRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'NotFound',
        component: () => import('@/views/error/404.vue')
      }
    ]
  }
];

export const adminRoutes = [
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home' },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/customer',
    meta: { title: '用户管理', icon: 'el-icon-s-data' },
    component: Layout,
    children: [
      {
        path: 'customer-list',
        name: 'CustomerList',
        meta: { title: '用户列表' },
        children: [
          {
            path: 'test',
            name: 'test',
            meta: { title: 'test' }
          }
        ]
      },

      {
        path: 'customer-info',
        name: 'CustomerInfo',
        meta: { title: '用户信息' }
      },
      {
        path: 'customer-data',
        name: 'CustomerData',
        meta: { title: '用户数据' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Setting',
        meta: { title: '系统设置', icon: 'el-icon-s-home' }
      }
    ]
  },

  // 404页面必须放置在最后
  { path: '*', redirect: '/404', hidden: true }
];
