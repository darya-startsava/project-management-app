import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Welcome from '$pages/Welcome';
import Boards from '$pages/Boards';
import OneBoard from '$pages/OneBoard';
import LogIn from '$pages/LogIn/LogIn';
import LogOut from '$pages/LogOut';
import Registration from '$pages/Registration';
import ErrorPage from '$pages/ErrorPage';
import RequiredAuth from '$components/RequiredAuth';

import { ROUTES_PATHS } from '$settings/routing';
import NotFoundPage from '$pages/NotFoundPage';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES_PATHS.welcome} element={<Welcome />} />
      <Route
        path={ROUTES_PATHS.boards}
        element={
          <RequiredAuth redirect={ROUTES_PATHS.welcome}>
            <Boards />
          </RequiredAuth>
        }
      />
      <Route
        path={`${ROUTES_PATHS.boards}/:id`}
        element={
          <RequiredAuth redirect={ROUTES_PATHS.welcome}>
            <OneBoard />
          </RequiredAuth>
        }
      />
      <Route path={ROUTES_PATHS.login} element={<LogIn />} />
      <Route
        path={ROUTES_PATHS.logout}
        element={
          <RequiredAuth redirect={ROUTES_PATHS.login}>
            <LogOut />
          </RequiredAuth>
        }
      />
      <Route path={ROUTES_PATHS.registration} element={<Registration />} />
      <Route path={ROUTES_PATHS.error_page} element={<ErrorPage />} />
      <Route path={ROUTES_PATHS.not_found_page} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
