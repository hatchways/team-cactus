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

class MyStorePage extends Component {
	// state = {

	// }

	// render() {
	// 	const { classes } = this.props;

	// 	return (
	// 		<div className={classes.container}>
				
	// 		</div>
	// 	);
	// }
}

export default withStyles(styles)(MyStorePage);