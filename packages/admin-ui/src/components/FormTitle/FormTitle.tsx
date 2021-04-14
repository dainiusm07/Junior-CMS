import { Typography } from '@material-ui/core';
import React from 'react';

import { FormTitleProps } from './FormTitle.props';
import useStyles from './FormTitle.styles';

const FormTitle: React.FC<FormTitleProps> = ({ title, subTitle }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant="h5">
        {title}
      </Typography>
      {subTitle && (
        <Typography
          className={classes.text}
          variant="body2"
          color="textSecondary"
        >
          {subTitle}
        </Typography>
      )}
    </div>
  );
};

export default FormTitle;
