import { createMuiTheme } from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';

export const theme = createMuiTheme({
  
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
  // shadows: Array(25).fill('none')
});
