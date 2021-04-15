import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#736CED' },
    background: { paper: '#222b36', default: '#171c24' },
    text: { primary: '#ffffff', secondary: '#919eab' },
  },
  shape: { borderRadius: 15 },
  overrides: {
    MuiButton: {
      text: {
        padding: '6px 14px',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '16.5px 14px',
      },
    },
  },
});

export default theme;
