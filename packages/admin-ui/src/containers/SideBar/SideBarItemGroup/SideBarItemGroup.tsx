import { Typography } from '@material-ui/core';

import { SideBarItemGroupProps } from './SideBarItemGroup.props';
import useStyles from './SideBarItemGroup.styles';

const SideBarItemGroup: React.FC<SideBarItemGroupProps> = ({
  name,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="div" variant="button">
        {name}
      </Typography>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default SideBarItemGroup;
