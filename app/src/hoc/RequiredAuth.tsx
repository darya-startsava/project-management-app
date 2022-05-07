import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '$store/store';
import { ROUTES_PATHS } from '$settings/data';

interface IRequiredAuthProps {
  children: JSX.Element | null;
  redirect?: string;
}

const RequiredAuth: FC<IRequiredAuthProps> = ({
  children,
  redirect = ROUTES_PATHS.home,
}: IRequiredAuthProps) => {
  const { isAuthorizationUser } = useAppSelector((state) => state.app);

  if (!isAuthorizationUser) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default RequiredAuth;
