import { Button } from '@material-ui/core';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { SideBarItemProps } from './SideBarItem.props';
import useStyles from './SideBarItem.styles';

const SideBarItem: React.FC<SideBarItemProps> = ({
  name,
  redirectTo,
  icon: Icon,
  match: regex,
  onClick,
}) => {
  const classes = useStyles();

  const isActive: NavLinkProps['isActive'] = (match, location) => {
    return regex.test(location.pathname);
  };

  return (
    <NavLink
      to={redirectTo}
      onClick={onClick}
      activeClassName={classes.active}
      className={classes.link}
      isActive={isActive}
    >
      <Button
        fullWidth
        startIcon={Icon && <Icon className={classes.iconRoot} />}
        className={classes.button}
      >
        {name}
      </Button>
    </NavLink>
  );
};

export default SideBarItem;
