import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '$pages/Home';
import Welcome from '$pages/Boards';
import Boards from '$pages/Boards';
import OneBoard from '$pages/OneBoard';
import LogIn from '$pages/LogIn';
import LogOut from '$pages/LogOut';
import Registration from '$pages/Registration';
import ErrorPage from '$pages/ErrorPage';
import RequiredAuth from '$hoc/RequiredAuth';

import { ROUTES_PATHS } from '$settings/data';
import { IWrapEl } from '$types/common';
import css from './Main.module.scss';

const Main: FC<IWrapEl> = ({ children, className }) => {
  return (
    <main className={`${className || ''} ${css.main}`}>
      <Routes>
        <Route path={ROUTES_PATHS.home} element={<Home />} />
        <Route path={ROUTES_PATHS.welcome} element={<Welcome />} />
        <Route
          path={ROUTES_PATHS.boards}
          element={
            <RequiredAuth redirect={ROUTES_PATHS.home}>
              <Boards />
            </RequiredAuth>
          }
        />
        <Route
          path={`${ROUTES_PATHS.boards}/:id`}
          element={
            <RequiredAuth redirect={ROUTES_PATHS.home}>
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
      </Routes>

      {children}
    </main>
  );
};

export default Main;
