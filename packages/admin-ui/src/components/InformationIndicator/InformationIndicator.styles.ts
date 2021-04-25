import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: theme.palette.common.black,
  },
  field: {
    color: theme.palette.common.black,
    textTransform: 'uppercase',
    fontWeight: 600,
    lineHeight: 1,
  },
  item: {
    margin: theme.spacing(0.8, 0.3),
  },
}));
