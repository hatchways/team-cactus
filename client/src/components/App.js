import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../themes/theme";
import NavBar from "./Nav/NavBar";
import LandingPage from "./Pages/Landing";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import MyStorePage from "./Pages/MyStore";

class App extends Component {
  state = {
    userType: 'shopper' 
    //current types: shopper(user not logged in), shopkeeper(user logged in)
    //future types: anonymous(not logged in), shopper, shopkeeper
  }

  updateUserType = (userType) => {
    console.log('userType', userType);
    this.setState({ userType: userType });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar userType={this.state.userType} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path='/login' render={(props) => <LoginPage {...props} updateUserType={this.updateUserType} />} />
          <Route exact path='/register' render={(props) => <RegisterPage {...props} updateUserType={this.updateUserType} />} />
          <Route exact path="/mystore" render={(props) => <MyStorePage {...props} />} />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
