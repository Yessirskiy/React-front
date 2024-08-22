import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserProfilePage from '../pages/profile/UserProfilePage';
import UserSettingsPage from '../pages/settings/UserSettingsPage';
import UserBalancePage from '../pages/balance/UserBalancePage';
import LoginPage from '../pages/auth/LoginPage';
import AccountRouteWrapper from './accountRouteWrapper';

const AccountRoutes = () => {
  return (
    <Routes>
      <Route
        path="/account/profile"
        element={
          <AccountRouteWrapper>
            <UserProfilePage />
          </AccountRouteWrapper>
        }
      />
      <Route
        path="/account/balance"
        element={
          <AccountRouteWrapper>
            <UserBalancePage />
          </AccountRouteWrapper>
        }
      />
      <Route
        path="/account/settings"
        element={
          <AccountRouteWrapper>
            <UserSettingsPage />
          </AccountRouteWrapper>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AccountRoutes;
