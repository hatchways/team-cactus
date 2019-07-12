import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import ButtonWrapper from '../Wrappers/ButtonWrapper';
import ErrorWrapper from '../Wrappers/ErrorWrapper';
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
    errors: {},
    responseError: ''
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
      // Send a POST request to login api
      const data = {
        email: this.state.email,
        password: this.state.password, 
      }
      console.log(data);

      axios({
          method: 'post',
          // url: `${window.location.origin}/users`,
          url: `http://localhost:3001/users/login`,
          data: data
      }).then(response => {
          console.log('SUCCESS', response);
          localStorage.setItem('token', response.data.token);
          console.log(localStorage);
          //console.log('request', req.user);
          this.props.updateUserType('shopkeeper');  //TODO: must change this to be dynamic

          const storeData = {
            userEmail: response.data.user.email,
          }

          // Fetch Shop Info
          axios({
            method: 'post',
            // url: `${window.location.origin}/users`,
            url: `http://localhost:3001/users/mystore`,
            headers: {'Authorization': localStorage.token },
            data: storeData
          }).then(response => {
            console.log('GOT IN STORE', response);

            // Redirect to shop
            
            // this.props.history.push(`/myshop`);
          }).catch(error => {
            console.log('ERROR', error);
            if(error.response){
                this.setState({ responseError: error.response});
            } else {
                this.setState({ responseError: 'Something went wrong :('});
            }
          });
          // this.props.history.push(`/myshop`);
      }).catch(error => {
          console.log('ERROR', error);
          if(error.response){
              this.setState({ responseError: error.response});
          } else {
              this.setState({ responseError: 'Something went wrong :('});
          }
      });
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
              type="text" 
              value={this.state.email} 
            />
            <FormTextFieldWrapper 
              error={this.state.touched.password ? (errors.password ? true : false) : false}
              helperText={this.state.touched.password ? errors.password : ''}
              id="password" 
              label="Password" 
              onChange={event => this.setState({ password: event.target.value })} 
              onBlur={this.handleBlur('password')} 
              type="password"
              value={this.state.password} 
            />
                
            {this.state.responseError ? (
              <ErrorWrapper>
                  {this.state.responseError}
              </ErrorWrapper> ) : ''
            }
            
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
