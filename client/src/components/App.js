import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../themes/theme";
import NavBar from "./Nav/NavBar";
import LandingPage from "./Pages/Landing";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";

class App extends Component {
  state = {
    userType: 'shopper'
  }

  updateUserType = (userType) => {
    this.setState({ userType: userType });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar userType={this.state.userType} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} userType={this.updateUserType} />
          <Route exact path="/register" component={RegisterPage} userType={this.updateUserType}/>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
