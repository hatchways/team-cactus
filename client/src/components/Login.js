import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Form from "./Form";
import { flexbox } from "@material-ui/system";

const loginPageStyle = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});

class LoginPage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
          <Form />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
