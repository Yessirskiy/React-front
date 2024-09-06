import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserProfilePage from './pages/profile/UserProfilePage';
import UserBalancePage from './pages/balance/UserBalancePage';
import UserSettingsPage from './pages/settings/UserSettingsPage';
import MeetingsFeedPage from './pages/feed/MeetingsFeedPage';
import { NotificationProvider } from './context/NotificationContext';
import MeetingsNewsPage from './pages/news/MeetingsNewsPage';
import ArticlePage from './pages/news/ArticlePage';
import MeetingsPage from './pages/meetings/MeetingsPage';
import MeetingPage from './pages/meetings/MeetingPage';
import LoginPage from './pages/auth/LoginPage';
import { AuthLayout } from './layouts/AuthLayout';
import { ProfileProvider } from './hooks/useProfile';
import CoursesPage from './pages/courses/CoursesPage';
import CoursePage from './pages/courses/CoursePage';

const router = createBrowserRouter([
  {
    element: <AuthLayout/>,
    children: [
      {
        path: "/login",
        element: <LoginPage/>
      },
      {
        path: "/",
        element: <MainLayout/>,
        children: [
          {
            path: "account/",
            element: <Outlet/>,
            children: [
              {
                path: "profile/",
                element: <ProfileProvider><UserProfilePage/></ProfileProvider>,
              },
              {
                path: "balance/",
                element: <UserBalancePage/>,
              },
              {
                path: "settings/",
                element: <UserSettingsPage/>,
              }
            ]
          },
          {
            path: "feed/",
            element: <MeetingsFeedPage/>,
          },
          {
            path: "news/",
            element: <MeetingsNewsPage/>,
          },
          {
            path: "news/:articleId/",
            element: <ArticlePage/>
          },
          {
            path: "meetings/",
            element: <MeetingsPage/>
          },
          {
            path: "meetings/:meetingId/",
            element: <MeetingPage/>
          },
          {
            path: "courses/",
            element: <CoursesPage/>
          },
          {
            path: "courses/:courseId/",
            element: <CoursePage/>
          }
        ]
      },
    ]
  },
])

const App = () => {
  return (
    <div className="App">
      <NotificationProvider>
        <RouterProvider router={router}/>
      </NotificationProvider>
    </div>
  );
};


export default App;