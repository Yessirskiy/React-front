import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ProfileProvider } from './context/ProfileContext';
import UserProfilePage from './pages/profile/UserProfilePage';
import UserBalancePage from './pages/balance/UserBalancePage';
import UserSettingsPage from './pages/settings/UserSettingsPage';
import MeetingsFeedPage from './pages/feed/MeetingsFeedPage';
import { NotificationProvider } from './context/NotificationContext';
import MeetingsNewsPage from './pages/news/MeetingsNewsPage';
import ArticlePage from './pages/news/ArticlePage';

const router = createBrowserRouter([
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
            element: <UserProfilePage/>,
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
        path: "meetings/",
        element: <Outlet/>,
        children: [
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
          }
        ]
      }
    ]
  }
])

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <NotificationProvider>
          <ProfileProvider>
            <RouterProvider router={router}/>
          </ProfileProvider>
        </NotificationProvider>
      </AuthProvider>   
    </div>
  );
};


export default App;