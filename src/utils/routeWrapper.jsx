import React from 'react';
import RequireAuth from './RequireAuth';
import { ProfileProvider } from '../context/ProfileContext';
import MainLayout from '../layouts/MainLayout';

const RouteWrapper = ({ children }) => {
  return (
    <RequireAuth>
      <ProfileProvider>
        <MainLayout>
          {children}
        </MainLayout>
      </ProfileProvider>
    </RequireAuth>
  );
};

export default RouteWrapper;
