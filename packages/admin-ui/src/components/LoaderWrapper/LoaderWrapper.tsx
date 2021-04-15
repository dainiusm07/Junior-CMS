import { CircularProgress } from '@material-ui/core';
import React from 'react';

import { LoaderWrapperProps } from './LoaderWrapper.props';
import useStyles from './LoaderWrapper.styles';

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ children, loading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {loading && (
        <div className={classes.loaderRoot}>
          <div className={classes.loaderWrapper}>
            <CircularProgress className={classes.loader} color="inherit" />
          </div>
        </div>
      )}
      <div style={{ opacity: !loading ? 1 : 0 }}>{children}</div>
    </div>
  );
};

export default LoaderWrapper;
