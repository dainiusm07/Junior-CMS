import { Breadcrumbs } from '@material-ui/core';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import routes from '../../routes';

const CmsBreadcrumbs: React.FC<RouteComponentProps> = ({ match }) => {
  const crumbs = routes
    .filter(({ path }) => {
      if (match.path !== '/' && path === '/') {
        return false;
      }
      return match.path.includes(path);
    })
    .map(({ path, name, ...rest }) => ({
      path: Object.keys(match.params).reduce(
        (path, param) =>
          path.replace(`:${param}`, (match as any).params[param]),
        path,
      ),
      name: typeof name === 'function' ? name(match.params) : name,
      ...rest,
    }));

  console.log(crumbs);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="#">
        Profilis
      </Link>
    </Breadcrumbs>
  );
};

export default CmsBreadcrumbs;
