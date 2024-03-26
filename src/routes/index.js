import { useRoutes, Navigate } from 'react-router-dom';

import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import { useSelector } from 'react-redux';

//render - Lessons
const Lessons = Loadable(lazy(() => import('pages/Lessons/Lessons')));

//render - Courses

const AllCourses = Loadable(lazy(() => import('pages/courses/AllCourses')));
const ActiveCourses = Loadable(lazy(() => import('pages/courses/ActiveCourses')));

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

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
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />
            }
          ]
        },
        {
          path: 'courses',
          element: <AllCourses />
        },
        {
          path: 'active_courses',
          element: <ActiveCourses />
        },
        {
          path: 'lessons/:lessonId',
          element: <Lessons />
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
