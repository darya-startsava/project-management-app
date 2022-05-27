import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from '$pages/Welcome';
import RequiredAuth from '$components/RequiredAuth';
import Boards from '$pages/Boards';
import OneBoard from '$pages/OneBoard';
import Profile from '$pages/Profile';
import Authorization from '$pages/Authorization';
import NotFoundPage from '$pages/NotFoundPage';
import ErrorPage from '$pages/ErrorPage';
import NoDoubleLogin from '$components/NoDoubleLogin';
import { ROUTES_PATHS } from '$settings/routing';

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
      <Route
        path={ROUTES_PATHS.login}
        element={
          <NoDoubleLogin redirect={ROUTES_PATHS.boards}>
            <Authorization key={'LogIn'} sortOfAuth={'LogIn'} />
          </NoDoubleLogin>
        }
      />
      <Route
        path={ROUTES_PATHS.registration}
        element={
          <NoDoubleLogin redirect={ROUTES_PATHS.boards}>
            <Authorization key={'Registration'} sortOfAuth={'Registration'} />
          </NoDoubleLogin>
        }
      />
      <Route
        path={ROUTES_PATHS.profile}
        element={
          <RequiredAuth redirect={ROUTES_PATHS.welcome}>
            <Profile />
          </RequiredAuth>
        }
      />
      <Route path={ROUTES_PATHS.error_page} element={<ErrorPage />} />
      <Route path={ROUTES_PATHS.not_found_page} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
