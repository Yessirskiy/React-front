import React from 'react';
import { Routes, Route } from 'react-router-dom';

import FeedPage from '../pages/feed/FeedPage';
import RouteWrapper from './routeWrapper';

const MeetingsRoutes = () => {
  return (
    <Routes>
      <Route
        path="/meetings/feed"
        element={
          <RouteWrapper>
            <FeedPage />
          </RouteWrapper>
        }
      />
      <Route
        path="/meetings/schedule"
        element={
          <RouteWrapper>
            <FeedPage />
          </RouteWrapper>
        }
      />
      <Route
        path="/meetings/visited"
        element={
          <RouteWrapper>
            <FeedPage />
          </RouteWrapper>
        }
      />
    </Routes>
  );
};

export default MeetingsRoutes;
