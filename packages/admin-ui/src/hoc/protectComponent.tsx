import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Permission } from '../generated/gql-types';
import { GlobalState } from '../redux/types';
import {
  userHasAnyPermissionSelector,
  userHasPermissionSelector,
} from '../redux/User/User.selectors';

type PermissionSelector<T> = (
  permissions: T,
) => (state: GlobalState) => boolean;

const protect = <T extends Permission | Permission[]>(
  fallbackValue: React.ReactElement | null,
  selector: PermissionSelector<T>,
) => <P extends {}>(Component: React.FC<P>, permissions: T) => {
  const ProtectedComponent: React.FC<P> = (props) => {
    const userHasPermission = useSelector(selector(permissions));

    if (userHasPermission) {
      return <Component {...props} />;
    }

    return fallbackValue;
  };

  return ProtectedComponent;
};

export const protectRouteComponent = protect(
  <Redirect to="/" />,
  userHasPermissionSelector,
);
export const protectComponent = protect(null, userHasPermissionSelector);
export const protectComponentAny = protect(null, userHasAnyPermissionSelector);
