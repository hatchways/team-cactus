import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../themes/theme";
import NavBar from "./Nav/NavBar";
import LandingPage from "./Landing";
import LoginPage from "./Login";
import RegisterPage from "./Register";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar /> {/*pass in user status (logged in, shopper/shopkeeper) */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
