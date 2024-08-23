import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserProfilePage from '../pages/profile/UserProfilePage';
import UserSettingsPage from '../pages/settings/UserSettingsPage';
import UserBalancePage from '../pages/balance/UserBalancePage';
import LoginPage from '../pages/auth/LoginPage';
import RouteWrapper from './routeWrapper';

const AccountRoutes = () => {
  return (
    <Routes>
      <Route
        path="/account/profile"
        element={
          <RouteWrapper>
            <UserProfilePage />
          </RouteWrapper>
        }
      />
      <Route
        path="/account/balance"
        element={
          <RouteWrapper>
            <UserBalancePage />
          </RouteWrapper>
        }
      />
      <Route
        path="/account/settings"
        element={
          <RouteWrapper>
            <UserSettingsPage />
          </RouteWrapper>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AccountRoutes;
