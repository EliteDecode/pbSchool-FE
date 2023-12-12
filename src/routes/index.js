import { useRoutes, Navigate } from 'react-router-dom';

import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import { useSelector } from 'react-redux';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { user } = useSelector((state) => state.auth);

  return useRoutes([
    {
      path: '/',
      element: user ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        },
        {
          path: 'color',
          element: <Color />
        },
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />
            }
          ]
        },
        {
          path: 'sample-page',
          element: <SamplePage />
        },
        {
          path: 'shadow',
          element: <Shadow />
        },
        {
          path: 'typography',
          element: <Typography />
        },
        {
          path: 'icons/ant',
          element: <AntIcons />
        }
      ]
    },
    {
      path: '/',
      element: <MinimalLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        }
      ]
    }
  ]);
}
