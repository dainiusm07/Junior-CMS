import { Tooltip, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';

import { InformationIndicatorProps } from './InformationIndicator.props';
import useStyles from './InformationIndicator.styles';

const InformationIndicator: React.FC<InformationIndicatorProps> = ({
  info,
  ...props
}) => {
  const classes = useStyles();

  const title = (
    <>
      <Typography variant="caption">
        {Object.entries(info).map(([field, value]) => (
          <div key={field} className={classes.item}>
            <div className={classes.field}>{field}</div>
            <div>{value}</div>
          </div>
        ))}
      </Typography>
    </>
  );

  return (
    <Tooltip
      enterTouchDelay={100}
      {...props}
      classes={{ tooltip: classes.tooltip }}
      title={title}
    >
      <InfoIcon />
    </Tooltip>
  );
};

export default InformationIndicator;
