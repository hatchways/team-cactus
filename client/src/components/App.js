import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "../themes/theme";
import LandingPage from "./Landing";
import LoginPage from "./Login";
import NavBar from "./NavBar";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
         <NavBar /> {/*pass in user status (logged in, shopper/shopkeeper) */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
