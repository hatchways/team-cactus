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

class RegisterPage extends Component {

    state = {
        name: '',
        email: '',
        password1: '',
        password2: '',
        touched: {
            name: false,
            email: false,
            password1: false,
            password2: false,
        },
        errors: {},
        responseError: '',
        errors: {}
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const errors = this.validateInput(this.state.name, this.state.email, this.state.password1, this.state.password2);
        const errorsPresent = Object.keys(errors).some(x => errors[x]);

        if(errorsPresent) {
            const touched = {
                name: true,
                email: true,
                password1: true,
                password2: true,
            };

            this.setState({ 
                touched : touched, 
                responseError: '' 
            });

            this.setState({ touched : touched });
        } else {
            // Send a POST request to register api
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password1, 
            }
            console.log(data);
            axios({
                method: 'post',
                // url: `${window.location.origin}/users`,
                url: `http://localhost:3001/users`,
                data: data
            }).then(response => {
                console.log('SUCCESS', response);
                this.props.updateUserType('shopkeeper');  //must change this to be dynamic
                // Redirect to shop
                this.props.history.push(`/myshop`);
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

    validateInput = (name, email, password1, password2) => {
        let nameError, emailError, password1Error, password2Error;
      
        if(name.length === 0) {
            nameError = 'Please enter a name.';
        }
      
        if((email.split("").filter(x => x === "@").length !== 1) || (email.indexOf(".") === -1) || email.length < 6 ) {
            emailError = "Please enter a valid email address.";
        }

        if(password1.length < 6) {
            password1Error = "Password must be at least 6 characters long.";
        }
      
        if(password2.length === 0){
            password2Error = "Please confirm password.";
        }else if (password1 !== password2){
            password2Error = "Passwords do not match.";
        }

        return {
            name: nameError,
            email: emailError,
            password1: password1Error,
            password2: password2Error
        };
    }

    render() {
        const { classes } = this.props;
        const errors = this.validateInput(this.state.name, this.state.email, this.state.password1, this.state.password2);
        
        return (
            <div className={classes.container}>
                <FormCardWrapper>
                    <TitleWrapper>
                        Create Shop
                    </TitleWrapper>
                    <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                        <FormTextFieldWrapper 
                            error={this.state.touched.name ? (errors.name ? true : false) : false}
                            helperText={this.state.touched.name ? errors.name : ''}
                            id="name" 
                            label="Name" 
                            onBlur={this.handleBlur('name')} 
                            onChange={event => this.setState({ name: event.target.value })}
                            type="text"
                            value={this.state.name} 
                        />
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
                            error={this.state.touched.password1 ? (errors.password1 ? true : false) : false}
                            helperText={this.state.touched.password1 ? errors.password1 : ''}
                            id="password1" 
                            label="Create Password" 
                            onChange={event => this.setState({ password1: event.target.value })} 
                            onBlur={this.handleBlur('password1')} 
                            type="password"
                            value={this.state.password1} 
                        />
                        <FormTextFieldWrapper 
                            error={this.state.touched.password2 ? (errors.password2 ? true : false) : false}
                            helperText={this.state.touched.password2 ? errors.password2 : ''}
                            id="password2" 
                            label="Confirm Password" 
                            onChange={event => this.setState({ password2: event.target.value })} 
                            onBlur={this.handleBlur('password2')}
                            type="password" 
                            value={this.state.password2} 
                        />

                        {this.state.responseError ? (
                            <ErrorWrapper>
                                {this.state.responseError}
                            </ErrorWrapper> ) : ''
                        }
                            
                        <ButtonWrapper type="submit" classes={{ button: classes.button }}>
                            Create
                        </ButtonWrapper>
                    </form>
                </FormCardWrapper>
            </div>
        );
    }
}

export default withStyles(styles)(RegisterPage);
