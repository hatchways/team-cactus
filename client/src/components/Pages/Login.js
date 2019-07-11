import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
import FormCardWrapper from '../Wrappers/FormCardWrapper';
import FormTextFieldWrapper from '../Wrappers/FormTextFieldWrapper';
import TitleWrapper from '../Wrappers/TitleWrapper';

const styles = theme => ({
  button: {
    marginTop: '25px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
});

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    touched: {
      email: false,
      password: false
    },
    errors: {}
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validateInput(this.state.email, this.state.password);
    const errorsPresent = Object.keys(errors).some(x => errors[x]);

    if(errorsPresent) {
      const touched = {
          email: true,
          password: true
      };

      this.setState({ touched : touched });
    } else {
      //Submit data
    }
  };

  handleBlur = (field) => (event) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      });
  }

  validateInput = (email, password) => {
    let emailError, passwordError;
  
    if((email.split("").filter(x => x === "@").length !== 1) || (email.indexOf(".") === -1) || email.length < 6 ) {
      emailError = "Please enter your email address.";
    }

    if(password.length === 0) {
      passwordError = "Please enter your password.";
    }

    return {
      email: emailError,
      password: passwordError,
    };
  }

  render() {
    const { classes } = this.props;
    const errors = this.validateInput(this.state.email, this.state.password);
    
    return (
      <div className={classes.container}>
        <FormCardWrapper>
          <TitleWrapper>
            Shop Login
          </TitleWrapper>
          <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
            <FormTextFieldWrapper 
              error={this.state.touched.email ? (errors.email ? true : false) : false}
              helperText={this.state.touched.email ? errors.email : ''}
              id="email" 
              label="Email" 
              onChange={event => this.setState({ email: event.target.value })} 
              onBlur={this.handleBlur('email')} 
              value={this.state.email} 
            />
            <FormTextFieldWrapper 
              error={this.state.touched.password ? (errors.password ? true : false) : false}
              helperText={this.state.touched.password ? errors.password : ''}
              id="password" 
              label="Password" 
              onChange={event => this.setState({ password: event.target.value })} 
              onBlur={this.handleBlur('password')} 
              value={this.state.password} 
            />
                  
            <ButtonWrapper type="submit" classes={{ button: classes.button }}>
              Login
            </ButtonWrapper>
          </form>
        </FormCardWrapper>
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);
