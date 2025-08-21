import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import AboutView from '@/pages/about/About';
import HomeView from '@/pages/home/Home';

// 定义路由配置
const routeConfig: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        element: <HomeView />,
        path: '/',
      },
      {
        element: <AboutView />,
        path: '/about',
      },
    ],
  },
];

const router = createBrowserRouter(routeConfig);

export default router;
