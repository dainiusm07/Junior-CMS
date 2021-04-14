import React from 'react';

import useStyles from './Center.styles';

const Center: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default Center;
