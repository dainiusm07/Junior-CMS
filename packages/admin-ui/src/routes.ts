import React from 'react';

import Profile from './containers/Profile/Profile';
import { Permission } from './generated/gql-types';
import { protectRouteComponent as protectComponent } from './hoc/protectComponent';
import Attributes from './pages/Attributes/Attributes';
import Categories from './pages/Categories/Categories';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Reports from './pages/Reports/Reports';

type NameFn = (params: Record<string, string>) => string;

type Route = {
  path: string;
  component: React.FC;
  name: string | NameFn;
};

const nameFnByParam = (param: string): NameFn => (params) => params[param];

const routes: Route[] = [
  {
    path: '/attributes',
    name: 'attributes',
    component: protectComponent(Attributes, Permission.ReadAttribute),
  },
  {
    path: '/categories',
    name: 'categories',
    component: protectComponent(Categories, Permission.ReadCategory),
  },
  {
    path: '/products',
    name: 'products',
    component: protectComponent(Products, Permission.ReadProduct),
  },
  {
    path: '/test',
    name: 'test',
    component: Reports,
  },
  {
    path: '/test/:ok',
    name: nameFnByParam('ok'),
    component: Reports,
  },

  {
    path: '/reports',
    name: 'reports',
    component: Reports,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
];

export default routes;
