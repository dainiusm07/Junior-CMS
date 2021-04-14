import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  loaderRoot: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  loaderWrapper: {
    display: 'inline-block',
    height: '100%',
  },
  loader: {
    display: 'block',
    width: 'auto !important',
    height: '100% !important',
    '& svg': {
      height: '100%',
    },
  },
}));
