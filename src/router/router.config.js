import Layout from '@/layout';
export const baseRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
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
        component: () => import('@/views/home')
      }
    ]
  },
  {
    path: '/customer',
    meta: { title: '用户管理', icon: 'el-icon-s-data' },
    component: Layout,
    children: [
      {
        path: 'customerList',
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
        path: 'customerInfo',
        name: 'CustomerInfo',
        meta: { title: '用户信息' }
      },
      {
        path: 'customerData',
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
  }
];
