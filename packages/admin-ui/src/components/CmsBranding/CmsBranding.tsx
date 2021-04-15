import { Typography } from '@material-ui/core';

import { CmsBrandingProps } from './CmsBranding.props';
import useStyles from './CmsBranding.styles';

const CmsBranding: React.FC<CmsBrandingProps> = ({ showText = true }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src="/logo.png" className={classes.img} />
      {showText && <Typography variant="h6">Junior CMS</Typography>}
    </div>
  );
};

export default CmsBranding;
