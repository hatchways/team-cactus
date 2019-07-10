import { createMuiTheme } from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';

export const theme = createMuiTheme({
  
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none'
      },
    },
  },
  typography: {
    "fontFamily": "Source Sans Pro"
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
