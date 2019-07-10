import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const loginPageStyle = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
      padding: '45px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '350px',
      marginTop: '80px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title:{
        marginBottom: '20px'
    },
    button: {
        marginTop: '30px',
        display: 'block'
    }
});

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    errors: []
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    const errors = this.validateInput(email, password);

    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }

    //Submit data
  };

  validateInput = (email, password) => {

    const errors = [];
  
    if(email.length === 0) {
        errors.push("You must enter your email.");
    }

    if(password.length === 0) {
      errors.push("You must enter your password.");
    }

    return errors;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <Typography variant="h5" component="h2" className={classes.title}>
              Login
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <FormControl>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input 
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  id="email" 
                  aria-describedby="email-helper-text" 
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input 
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                  id="password" 
                  aria-describedby="password-helper-text" 
                />
            </FormControl>
                
            <Button variant="contained" type="submit" color="primary" size="medium" className={classes.button}>
                Login
            </Button>
            <List component="ul">
              {this.state.errors.map((error, index) => (
                  <ListItem component="li" key={index}>
                      {error}
                  </ListItem>
              ))}
            </List>
          </form>
        </Card>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
