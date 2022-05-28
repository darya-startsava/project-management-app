import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { setToken } from './appSlice';
import { ROUTES_PATHS } from '$settings/routing';
import { TOKEN_AUTH_LOCALSTORAGE } from '$settings/index';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // eslint-disable-next-line no-console
    console.warn('next', next, 'action', action);

    const { statusCode } = action.payload.data;
    if (statusCode === 401) {
      // eslint-disable-next-line no-console
      console.warn('error');
      localStorage.removeItem(TOKEN_AUTH_LOCALSTORAGE);
      api.dispatch(setToken(null));

      return <Navigate to={ROUTES_PATHS.welcome} />;
    }

    return next(action);
  }
};

export default rtkQueryErrorLogger;
