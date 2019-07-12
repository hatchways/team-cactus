import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../themes/theme";
import NavBar from "./Nav/NavBar";
import LandingPage from "./Pages/Landing";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar /> {/*pass in user status (logged in, shopper/shopkeeper) */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/mystore" component={MyStorePage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
