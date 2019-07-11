import { createMuiTheme } from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';

export const theme = createMuiTheme({
  
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none'
      },
    },
    MuiFormControl: {
      marginDense: {
        marginBottom: '6px'
      }
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          color: '#df5353',
          marginTop: '3px',
          marginBottom: '6px'
        }
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: '.9rem',
        '&$error': {
            color: 'rgba(0, 0, 0, 0.54)',
            zIndex: 99,
        }
      }
    },
    MuiOutlinedInput: {
      root: {
          '& $notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
              borderRadius: 0,
          },
          '&$error $notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
              backgroundColor: '#ffe8e6',
          },
      },
      input: {
        zIndex: 99,
      }
    },
  },
  typography: {
    fontFamily: 'Roboto'
  },
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[50],
    }
  },
});
