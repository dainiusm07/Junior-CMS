import AssessmentIcon from '@material-ui/icons/Assessment';
import CategoryIcon from '@material-ui/icons/Category';
import ClassIcon from '@material-ui/icons/Class';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Permission } from '../../../generated/gql-types';
import { SideBarItemProps } from '../SideBarItem/SideBarItem.props';

type SideBarContentDataItem = Omit<SideBarItemProps, 'onClick'> & {
  permission?: Permission;
};

export type SideBarContentData = {
  name: string;
  permissions?: Permission[];
  items: SideBarContentDataItem[];
};

const data: SideBarContentData[] = [
  {
    name: 'general',
    items: [
      {
        icon: DashboardIcon,
        name: 'dashboard',
        match: new RegExp('^/$'),
        redirectTo: '/',
      },
      {
        icon: AssessmentIcon,
        name: 'reports',
        match: new RegExp('^/reports$'),
        redirectTo: '/reports',
      },
    ],
  },
  {
    name: 'catalog',
    permissions: [
      Permission.ReadCategory,
      Permission.ReadProduct,
      Permission.ReadAttribute,
    ],
    items: [
      {
        icon: CategoryIcon,
        name: 'categories',
        match: new RegExp('^/categories$'),
        permission: Permission.ReadCategory,
        redirectTo: '/categories',
      },
      {
        icon: ShoppingCartIcon,
        name: 'products',
        match: new RegExp('^/products$'),
        permission: Permission.ReadProduct,
        redirectTo: '/products',
      },
      {
        icon: ClassIcon,
        name: 'attributes',
        match: new RegExp('^/attributes$'),
        permission: Permission.ReadAttribute,
        redirectTo: '/attributes',
      },
    ],
  },
];

export default data;
