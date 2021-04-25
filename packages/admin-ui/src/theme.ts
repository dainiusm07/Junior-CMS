import {
  fade,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core';

const textPrimaryColor = 'rgb(255, 255, 255)';
const textSecondaryColor = 'rgb(145, 158, 171)';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#736CED' },
    background: { paper: '#222b36', default: '#171c24' },
    text: { primary: textPrimaryColor, secondary: textSecondaryColor },
  },
  shape: { borderRadius: 15 },
  overrides: {
    MuiButton: {
      text: {
        padding: '6px 14px',
      },
    },
    MuiFormLabel: {
      root: {
        '&$disabled': {
          color: fade(textPrimaryColor, 0.3),
        },
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: fade(textSecondaryColor, 0.25),
      },
      root: {
        '&$disabled': {
          color: fade(textPrimaryColor, 0.3),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: fade(textSecondaryColor, 0.15),
          },
        },
      },
      input: {
        padding: '16.5px 14px',
      },
    },
  },
});

export default theme;
