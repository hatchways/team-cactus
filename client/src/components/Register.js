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

const registerPageStyle = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        padding: '45px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
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
    }
});

class RegisterPage extends Component {

    state = {
        name: '',
        email: '',
        password1: '',
        password2: '',
        errors: []
    }

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { name, email, password1, password2 } = this.state;
  
        const errors = this.validateInput(name, email, password1, password2);
    
        if (errors.length > 0) {
          this.setState({ errors: errors });
          return;
        }
    
        //Submit data
    };

    validateInput = (name, email, password1, password2) => {

        const errors = [];
      
        if(name.length === 0) {
            errors.push("You must enter a name.");
        }
      
        if(email.split("").filter(x => x === "@").length !== 1) {
            errors.push("Email should contain a @.");
        }
        if(email.indexOf(".") === -1) {
            errors.push("Email should contain at least one dot.");
        }
      
        if(password1 !== password2){
            errors.push("Passwords do not match.");
        } else if (password1.length < 6) {
            errors.push("Password should be at least 6 characters long.");
        }

        return errors;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <Typography variant="h5" component="h2" className={classes.title}>
                        Create Store
                    </Typography>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <FormControl>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input 
                                value={this.state.name}
                                onChange={event => this.setState({ name: event.target.value })}
                                id="name" 
                                aria-describedby="name-helper-text" 
                            />
                        </FormControl>
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
                            <InputLabel htmlFor="password1">Create Password</InputLabel>
                            <Input 
                                value={this.state.password1}
                                onChange={event => this.setState({ password1: event.target.value })}
                                id="password1" 
                                aria-describedby="password1-helper-text" 
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                            <Input 
                                value={this.state.password2}
                                onChange={event => this.setState({ password2: event.target.value })}
                                id="password2" 
                                aria-describedby="password2-helper-text" 
                            />
                        </FormControl>
                            
                        <Button variant="contained" type="submit" color="primary" size="medium" className={classes.button}>
                            Sign Up
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

export default withStyles(registerPageStyle)(RegisterPage);
